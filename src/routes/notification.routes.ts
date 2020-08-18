import { Router, request, response } from 'express';
import TreasuryBond from '../models/TreasuryBond';
import Notification from '../models/Notification';
import NotificationsRepository from '../repositories/NotificationsRepository';
import CreateNotificationService from '../services/CreateNotificationService';
import { getCustomRepository } from 'typeorm';
const notificationsRouter = Router();

notificationsRouter.get('/', async (request, response) => {
  const notificationsRepository = getCustomRepository(NotificationsRepository);
  const notifications = await notificationsRepository.find();

  return response.json(notifications);
});

notificationsRouter.post('/', async (request, response) => {
  try {
    const { bond, value, type, notifyByEmail, notifyByBrowser } = request.body;

    const createNotification = new CreateNotificationService();

    const notification = await createNotification.execute({
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
