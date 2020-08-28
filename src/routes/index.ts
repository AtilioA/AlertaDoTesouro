import { Router } from 'express';
import notificationsRouter from './notifications.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import treasuryBondsRouter from './treasurybonds.routes';
import emailRouter from './email.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/treasurybonds', treasuryBondsRouter);

routes.use('/notifications', notificationsRouter);

routes.use('/email', emailRouter);
export default routes;
