import { Router, request, response } from 'express';
import TreasuryBond from '../models/TreasuryBond';
import Notification from '../models/Notification';
import NotificationsRepository from '../repositories/NotificationsRepository';
import CreateNotificationService from '../services/CreateNotificationService';
const notificationsRouter = Router();

// Stub until connection to database is implemented
const notifications: Notification[] = [];

const notificationsRepository = new NotificationsRepository();

notificationsRouter.get('/', (request, response) => {
  const notifications = notificationsRepository.all();

  return response.json(notifications);
});

notificationsRouter.post('/', (request, response) => {
  try {
    const { bond, value, type, notifyByEmail, notifyByBrowser } = request.body;

    const createNotification = new CreateNotificationService(
      notificationsRepository,
    );

    const notification = createNotification.execute({
      bond,
      value,
      type,
      notifyByEmail,
      notifyByBrowser,
    });

    return response.json(notification);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default notificationsRouter;
