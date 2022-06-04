import { Router } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import ResetUserPasswordService from '../services/ResetUserPasswordService';
import DeleteUserService from '../services/DeleteUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Queue from '../services/Queue';
import SendResetPasswordMail from '../jobs/SendResetPasswordMail';
import authConfig from '../config/auth';
import SendDataExportMail from '../jobs/SendDataExportMail';
import Notification from '../models/Notification';
import User from '../models/User';
import UserAlreadyExistsError from '../models/exceptions/UserAlreadyExistsError';
import sendConfirmationMail from '../utils/sendConfirmationEmail';

const usersRouter = Router();

interface TokenPayload {
  iat: number;
  exp: number;
  // FIXME: not sure why I can't call this 'user'
  user: {
    email: string;
    id: string;
    created_at: string;
    updated_at: string;
  };
}

/**
 * Repositories - business rules
 * Services - database
 */

/**
 * Endpoint for updating a user's password given a valid JWT token (user is obtained from the token payload)
 */
usersRouter.put('/reset-password/:token', async (request, response, next) => {
  try {
    const { token } = request.params;

    const { newPassword, newPasswordConfirmation } = request.body;

    const decoded = verify(token, authConfig.jwt.secret as string);
    const { user } = decoded as TokenPayload;

    const resetUserPassword = new ResetUserPasswordService();

    const updated = await resetUserPassword.execute(
      user.id,
      newPassword,
      newPasswordConfirmation,
    );

    // Responds sucessfully with no content
    return response.status(204).json();
  } catch (err) {
    if (err instanceof Error) {
      response
        .status(400)
        .json({ error: `Link de redefinição inválido: ${err.message}` });
    }
    next(err);
  }
});

/**
 * Endpoint for requesting a password reset email for a given user/email.
 */
usersRouter.post('/reset-password', async (request, response) => {
  try {
    const { email } = request.body;

    const usersRepository = getRepository(User);

    const findUser: User | undefined = await usersRepository.findOne({
      where: { email },
    });

    // User has been found
    if (findUser) {
      // Create confirmation token so the user can confirm their account
      const EMAIL_SECRET = authConfig.jwt.secret;
      const emailToken = sign(
        {
          user: findUser,
        },
        EMAIL_SECRET as string,
        {
          expiresIn: authConfig.jwt.expiresIn,
        },
      );

      // Send reset password email
      await Queue.add(SendResetPasswordMail.key, {
        token: emailToken,
        user: findUser,
      });

      // Return response with status 200 and success message, since the user was found
      return response.status(200).json({
        message: 'Reset password email sent.',
      });
    }

    // Return response with status 400 and error message, since the user was not found
    response.status(400).json({
      message: `User with email '${email}' not found.`,
    });
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
  }
});

/**
 * Endpoint for creating a new User.
 */
usersRouter.post('/', async (request, response, next) => {
  try {
    const { email, password } = request.body;

    // Note that this will also be validated by the front-end with Yup schemas
    if (password.length < 8) {
      throw new Error('Passwords must be at least 8 characters long.');
    }

    // Invoke CreateUserService to manipulate data
    const createUser = new CreateUserService();
    const user = await createUser.execute({ email, password });

    if (user) {
      sendConfirmationMail(user);
    }

    return response.json(user);
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      const { email } = request.body;
      const user = await getRepository(User).findOne({
        where: { email },
      });

      if (user && !user.confirmed) {
        sendConfirmationMail(user);

        return response
          .status(400)
          .json({ error: `${err.message} Confirmation email resent.` });
      }

      return response.status(400).json({
        error: `${err.message} User is already confirmed, so confirmation email was not resent.`,
      });
    }

    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    next(err);
  }
});

usersRouter.use(ensureAuthenticated); // All user editing routes (below) require authentication

/**
 * Endpoint for export data from a given User.
 */
usersRouter.get('/export', async (request, response, next) => {
  try {
    const user_id = request.user.id;

    const userRepository = getRepository(User);
    const findUser: User | undefined = await userRepository.findOne(user_id);

    if (findUser) {
      // Find all notifications related to findUser
      const notificationsRepository = await getRepository(Notification);
      const notifications = await notificationsRepository.find({
        where: { user: findUser },
        relations: ['user'],
      });

      // Get relevant data from User object + notifications
      const exportedUserData = {
        id: findUser.id,
        email: findUser.email,
        notify: findUser.notify,
        notifyByEmail: findUser.notifyByEmail,
        notifyByBrowser: findUser.notifyByBrowser,
        notifications,
      };

      // Add export data email task to the queue, so that it will be sent to the user
      await Queue.add(SendDataExportMail.key, {
        userData: exportedUserData,
      });

      return response.json({ ok: `Data export was sent to ${findUser.email}` });
    }
    return response.status(400).json({ error: 'User not found' });
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    next(err);
  }
});

/**
 * Endpoint for updating a given User.
 */
usersRouter.put('/', async (request, response, next) => {
  try {
    const user_id = request.user.id;

    const {
      oldPassword,
      newPassword,
      newPasswordConfirmation,
      notify,
      notifyByEmail,
      notifyByBrowser,
    } = request.body;

    const updateUser = new UpdateUserService();
    const updated = await updateUser.execute(
      user_id,
      oldPassword,
      newPassword,
      newPasswordConfirmation,
      notify,
      notifyByEmail,
      notifyByBrowser,
    );

    return response.json({ ok: 'User was updated', updated });
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    next(err);
  }
});

/**
 * Endpoint for deleting a given User.
 */
usersRouter.delete('/', async (request, response, next) => {
  try {
    // Delete the user who sent the request
    const user_id = request.user.id;

    const deleteUser = new DeleteUserService();
    const deleted = await deleteUser.execute(user_id);

    return response.json({ ok: 'User was deleted', deleted });
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    next(err);
  }
});

export default usersRouter;
