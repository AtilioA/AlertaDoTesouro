import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import { UserOptionalPassword } from '../@types/alertadotesouro';
import UserAlreadyExistsError from '../models/exceptions/UserAlreadyExistsError';

/**
 * Interface for the request object for creating a new User.
 */
interface Request {
  email: string;
  password: string;
}

/**
 * @class CreateUserService
 * @description Service for creating a new User.
 */
class CreateUserService {
  // Returns a user without password field
  public async execute({ email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const findUser: User | undefined = await usersRepository.findOne({
      where: { email },
    });

    if (findUser) {
      throw new UserAlreadyExistsError('E-mail address is already being used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      password: hashedPassword,
    }) as UserOptionalPassword;

    await usersRepository.save(user);

    delete user.password;

    return user as User;
  }
}

export default CreateUserService;
