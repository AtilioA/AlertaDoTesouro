import { Router } from 'express';
import { uuid } from 'uuidv4';

const notificationsRouter = Router();

const notifications = [];

notificationsRouter.post('/', (request, response) => {
  const { value, type, notifyByMail, notifyByBrowser } = request.body;
  const notification = {
    id: uuid(),
    value,
    type,
    notifyByMail,
    notifyByBrowser,
  };

  notifications.push(notification);

  return response.json(notification);
});

export default notificationsRouter;
