import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Queue from '../services/Queue';
import SendConfirmAccountMail from '../jobs/SendConfirmAccountMail';
import authConfig from '../config/auth';
import { sign } from 'jsonwebtoken';

const usersRouter = Router();

/**
 * Repositories - business rules
 * Services - database
 */

// Create users endpoint
usersRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ email, password });

    delete user.password;

    const EMAIL_SECRET = authConfig.jwt.secret;

    const emailToken = sign(
      {
        user,
      },
      EMAIL_SECRET,
      {
        expiresIn: '1d',
      },
    );

    await Queue.add(SendConfirmAccountMail.key, {
      token: emailToken,
      user,
    });

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.use(ensureAuthenticated); // All user editing routes require authentication

// Update user endpoint
usersRouter.put('/', async (request: any, response) => {
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
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

// Delete user endpoint
usersRouter.delete('/', async (request: any, response) => {
  try {
    const user_id = request.user.id;

    const deleteUser = new DeleteUserService();

    const deleted = await deleteUser.execute(user_id);
    return response.json({ ok: 'User was deleted', deleted });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
