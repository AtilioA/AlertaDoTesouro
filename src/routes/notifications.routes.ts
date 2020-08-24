import { Router, request, response } from 'express';
import NotificationsRepository from '../repositories/NotificationsRepository';
import CreateNotificationService from '../services/CreateNotificationService';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import DeleteNotificationService from '../services/DeleteNotificationService';

const notificationsRouter = Router();
notificationsRouter.use(ensureAuthenticated); // All notifications routes require authentication

// List all notifications endpoint
notificationsRouter.get('/', async (request: any, response) => {
  const notificationsRepository = getCustomRepository(NotificationsRepository);
  const user_id = request.user.id;
  const notifications = await notificationsRepository.find({
    where: { user_id },
  });

  return response.json(notifications);
});

// Create notification endpoint
notificationsRouter.post('/', async (request: any, response) => {
  try {
    const {
      treasurybond_id,
      value,
      type,
      notifyByEmail,
      notifyByBrowser,
      active,
    } = request.body;

    const user_id = request.user.id;

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

// Delete notification endpoint
notificationsRouter.delete(
  '/:notificationId',
  async (request: any, response) => {
    try {
      const notification_id = request.params['notificationId'];
      const user_id = request.user.id;

      const deleteNotification = new DeleteNotificationService();

      const deleted = await deleteNotification.execute(
        user_id,
        notification_id,
      );
      return response.json({ deleted });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

export default notificationsRouter;
