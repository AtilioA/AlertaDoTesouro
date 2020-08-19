import { Router } from 'express';
import notificationsRouter from './notifications.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/notifications', notificationsRouter);
routes.use('/users', usersRouter);

export default routes;
