import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import { UserOptionalPassword } from '../@types/alertadotesouro';

/**
 * Interface for the request object for creating a new User session.
 */
interface Request {
  email: string;
  password: string;
}

/**
 * Interface for the response object for creating a new User session.
 */
interface Response {
  user: User;
  token: string;
}

/**
 * @class CreateUserSessionService
 * @description Service for creating a new User session.
 */
export default class CreateUserSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    if (!user.confirmed) {
      throw new Error('Please confirm your email to activate your account.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret as string, {
      subject: user.id,
      expiresIn,
    });

    delete (user as UserOptionalPassword).password;

    return { user, token };
  }
}
