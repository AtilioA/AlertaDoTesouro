import { Router } from 'express';
import CreateUserSessionService from '../services/CreateUserSessionService';

const sessionsRouter = Router();

/**
 * Endpoint for creating a new User session.
 */
sessionsRouter.post('/', async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const createUserSession = new CreateUserSessionService();

    const { user, token } = await createUserSession.execute({
      email,
      password,
    });

    return response.json({ user, token });
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    next(err);
  }
});

export default sessionsRouter;
