import { Router } from 'express';
import usersRouter from './users.routes';
import notificationsRouter from './notifications.routes';
import sessionsRouter from './sessions.routes';
import treasuryBondRouter from './treasurybond.routes';
import emailRouter from './email.routes';

// Define main Router
const routes = Router();

/**
 * Root route of the API (/); returns a json message.
 */
routes.get('/', async (_, response) => {
  return response.json({ message: '🌐 AlertaDoTesouro is online.' });
});

// Define all main routes of the API with their respective sub-routes
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/treasurybond', treasuryBondRouter);
routes.use('/notifications', notificationsRouter);
routes.use('/email', emailRouter);

export default routes;
