import { Router } from 'express';
import { sign, verify } from 'jsonwebtoken';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Queue from '../services/Queue';
import SendConfirmAccountMail from '../jobs/SendConfirmAccountMail';
import SendResetPasswordMail from '../jobs/SendResetPasswordMail';
import authConfig from '../config/auth';
import { getRepository } from 'typeorm';
import User from '../models/User';

const usersRouter = Router();

interface TokenPayload {
  iat: number;
  exp: number;
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

// Confirm email (user) endpoint
usersRouter.get('/reset-password/:token', async (request, response, next) => {
  try {
    const { token } = request.params;

    const decoded = verify(token, authConfig.jwt.secret as string);
    const { user } = decoded as TokenPayload;

    // const usersRepository = getRepository(User);
    // await usersRepository.update({ id: user.id }, { confirmed: true });

    response.json({ ok: true, user });
    // return response.redirect('/');  // Return to homepage
  } catch (err) {
    if (err instanceof Error) {
      response
        .status(400)
        .json({ error: `Link de redefinição inválido: ${err.message}` });
    }
    next(err);
  }
});

// Reset password endpoint
usersRouter.post('/reset-password', async (request, response) => {
  try {
    const { email } = request.body;

    const usersRepository = getRepository(User);

    const checkIfUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkIfUserExist) {
      // Create confirmation token so the user can confirm their account
      const EMAIL_SECRET = authConfig.jwt.secret;
      const emailToken = sign(
        {
          checkIfUserExist,
        },
        EMAIL_SECRET as string,
        {
          expiresIn: authConfig.jwt.expiresIn,
        },
      );

      // Send reset password email
      await Queue.add(SendResetPasswordMail.key, {
        token: emailToken,
        user: checkIfUserExist,
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

// Create users endpoint
usersRouter.post('/', async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ email, password });

    // Create confirmation token so the user can confirm their account
    const EMAIL_SECRET = authConfig.jwt.secret;
    const emailToken = sign(
      {
        user,
      },
      EMAIL_SECRET as string,
      {
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    // Send confirmation email
    await Queue.add(SendConfirmAccountMail.key, {
      token: emailToken,
      user: user,
    });

    return response.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    next(err);
  }
});

usersRouter.use(ensureAuthenticated); // All user editing routes (below) require authentication

// Update user endpoint
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

// Delete user endpoint
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
