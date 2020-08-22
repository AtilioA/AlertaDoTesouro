import { Router } from 'express';
import CreateUserSessionService from '../services/CreateUserSessionService';

const sessionsRouter = Router();

// Create sessions endpoint
sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createUserSession = new CreateUserSessionService();

    const { user, token } = await createUserSession.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;