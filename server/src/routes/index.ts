import { Router } from 'express';
import usersRouter from './users.routes';
import notificationsRouter from './notifications.routes';
import sessionsRouter from './sessions.routes';
import treasuryBondsRouter from './treasurybonds.routes';
import emailRouter from './email.routes';

// Define main Router
const routes = Router();

routes.get('/', async (_, response) => {
  return response.send('🌐 AlertaDoTesouro is online.');
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/treasurybonds', treasuryBondsRouter);
routes.use('/notifications', notificationsRouter);
routes.use('/email', emailRouter);

export default routes;
