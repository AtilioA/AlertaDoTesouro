import { getConnection, DeleteResult, getRepository } from 'typeorm';
import User from '../models/User';

/**
 * Service for deleting a User.
 */
class DeleteUserService {
  public async execute(user_id: string): Promise<DeleteResult> {
    // Search and delete user from the database
    const userRepository = getRepository(User);
    const findUser: User | undefined  = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!findUser) {
      throw new Error('This user does not exist.');
    }

    const deleteUser = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :user_id', { user_id })
      .execute();

    return deleteUser;
  }
}

export default DeleteUserService;
