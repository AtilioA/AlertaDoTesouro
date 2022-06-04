import * as Yup from 'yup';
import { UpdateResult, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

/**
 * @class UpdateUserService
 * @description Service for updating a User.
 */
class UpdateUserService {
  public async execute(
    user_id: string,
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string,
    notify: boolean,
    notifyByEmail: boolean,
    notifyByBrowser: boolean,
  ): Promise<UpdateResult> {
    // Define the validation schema
    const schema = Yup.object().shape({
      oldPassword: Yup.string(),
      newPassword: Yup.string()
        .min(8)
        .when('oldPassword', (oldPasswordIn: string, field: any) =>
          oldPasswordIn ? field.required() : field,
        ),
      newPasswordConfirmation: Yup.string().when(
        'newPassword',
        (newPasswordIn: string, field: any) =>
          newPasswordIn
            ? field.required().oneOf([Yup.ref('newPassword')])
            : field,
      ),
    });

    // Validate the request data against the schema
    await schema
      .validate(
        { oldPassword, newPassword, newPasswordConfirmation },
        {
          abortEarly: false,
        },
      )
      .catch(errors => {
        throw Error(`Validation failed: ${errors.errors}`);
      });

    const userRepository = getRepository(User);

    const findUser: User | undefined  = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!findUser) {
      throw new Error('This user does not exist.');
    }

    const hashedPassword = await hash(newPassword, 8);

    const updateResult = await userRepository.update(
      { id: user_id },
      { password: hashedPassword, notify, notifyByBrowser, notifyByEmail },
    );

    return updateResult;
  }
}

export default UpdateUserService;
