import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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
    return response.json({ updated });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
