import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import { UserOptionalPassword } from '../@types/alertadotesouro';

interface Request {
  email: string;
  password: string;
}

class CreateUserService {
  /// Returns a user without password field
  public async execute({ email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkIfUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkIfUserExist) {
      throw new Error('E-mail address is already being used.');
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
