import { Router, request } from 'express';
import TreasuryBond from '../models/TreasuryBond';
import Notification from '../models/Notification';
import NotificationsRepository from '../repositories/NotificationsRepository';
const notificationsRouter = Router();

// Stub until connection to database is implemented
const notifications: Notification[] = [];

const notificationsRepository = new NotificationsRepository();

notificationsRouter.get('/', (request, response) => {
  const notifications = notificationsRepository.all();

  return response.json(notifications);
});

notificationsRouter.post('/', (request, response) => {
  const { bond, value, type, notifyByEmail, notifyByBrowser } = request.body;

  // Stub until connection to database is implemented
  const findNotificationForTheSameBond = notificationsRepository.findByCode(
    bond.code,
  );

  if (findNotificationForTheSameBond) {
    return response
      .status(400)
      .json({ message: 'A notification for this bond already exists.' });
  }

  const notification = notificationsRepository.create(
    bond,
    value,
    type,
    notifyByEmail,
    notifyByBrowser,
  );

  return response.json(notification);
});

export default notificationsRouter;
