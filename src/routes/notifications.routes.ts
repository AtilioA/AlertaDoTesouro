import { Router, request, response } from 'express';
import NotificationsRepository from '../repositories/NotificationsRepository';
import CreateNotificationService from '../services/CreateNotificationService';
import { getCustomRepository } from 'typeorm';
const notificationsRouter = Router();

// List all notifications endpoint
notificationsRouter.get('/', async (request, response) => {
  const notificationsRepository = getCustomRepository(NotificationsRepository);
  const notifications = await notificationsRepository.find();

  return response.json(notifications);
});

// Create notification endpoint
notificationsRouter.post('/', async (request, response) => {
  try {
    const {
      user_id,
      treasurybond_id,
      value,
      type,
      notifyByEmail,
      notifyByBrowser,
      active,
    } = request.body;

    const createNotification = new CreateNotificationService();

    // Create and save it in the database
    const notification = await createNotification.execute({
      user_id,
      treasurybond_id,
      value,
      type,
      notifyByEmail,
      notifyByBrowser,
      active,
    });

    return response.json(notification);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default notificationsRouter;
