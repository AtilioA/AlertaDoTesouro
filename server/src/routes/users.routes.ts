import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Queue from '../services/Queue';
import SendConfirmAccountMail from '../jobs/SendConfirmAccountMail';
import authConfig from '../config/auth';

const usersRouter = Router();

/**
 * Repositories - business rules
 * Services - database
 */

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

    // Create confirmation token so that the user can confirm their account
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

    // Add confirmation email task to the queue, so that it will be sent to the user
    await Queue.add(SendConfirmAccountMail.key, {
      token: emailToken,
      user,
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
