import { getRepository } from 'typeorm';
import User from '../models/User';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
// import * as dotenv from 'dotenv';
// dotenv.config();

import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class CreateUserSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    console.log(user);

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret), {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
