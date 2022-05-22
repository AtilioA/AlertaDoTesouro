import * as Yup from 'yup';
import { UpdateResult, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

class UpdateUserService {
  public async execute(
    user_id: string,
    newPassword: string,
    newPasswordConfirmation: string,
  ): Promise<UpdateResult> {
    const schema = Yup.object().shape({
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

    await schema
      .validate(
        { newPassword, newPasswordConfirmation },
        {
          abortEarly: false,
        },
      )
      .catch(errors => {
        throw Error(`Validation failed: ${errors.errors}`);
      });

    const userRepository = getRepository(User);

    const findUser = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!findUser) {
      throw new Error('This user does not exist.');
    }

    const hashedPassword = await hash(newPassword, 8);

    const updateResult = await userRepository.update(
      { id: user_id },
      { password: hashedPassword },
    );

    return updateResult;
  }
}

export default UpdateUserService;
