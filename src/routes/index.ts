import { Router } from 'express';
import notificationsRouter from './notification.routes';

const routes = Router();

routes.use('/notifications', notificationsRouter);
  
export default routes;
