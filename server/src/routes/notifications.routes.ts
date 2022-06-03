import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import NotificationsRepository from '../repositories/NotificationsRepository';
import CreateNotificationService from '../services/CreateNotificationService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import DeleteNotificationService from '../services/DeleteNotificationService';
import UpdateNotificationService from '../services/UpdateNotificationService';
import User from '../models/User';

const notificationsRouter = Router();

// All notifications routes require authentication
notificationsRouter.use(ensureAuthenticated);

/**
 * Endpoint for listing all notifications for a given User.
 */
notificationsRouter.get('/', async (request, response) => {
  const notificationsRepository = getCustomRepository(NotificationsRepository);
  const user_id = request.user.id;
  const notifications = await notificationsRepository.find({
    where: { user_id },
  });

  return response.json(notifications);
});

/**
 * Endpoint for creating a new Notification for a given User.
 */
notificationsRouter.post('/', async (request, response, next) => {
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

    const userRepository = getRepository(User);
    const findUser: User | undefined = await userRepository.findOne(user_id);

    if (!findUser) {
      throw new Error('User not found when creating notification');
    }

    response.json({ notification });
  } catch (err) {
    if (err instanceof Error) {
      response.status(400).json({ error: err.message });
    }
    next(err);
  }
});

/**
 * Endpoint for updating a Notification for a given User.
 * @param {string} notification_id - ID of the Notification to be updated
 */
notificationsRouter.put(
  '/:notification_id',
  async (request, response, next) => {
    try {
      const { notification_id } = request.params;
      const user_id = request.user.id;

      const { value, type, notifyByEmail, notifyByBrowser, active } =
        request.body;

      const updateNotification = new UpdateNotificationService();

      const updated = await updateNotification.execute(
        user_id,
        notification_id,
        value,
        type,
        notifyByEmail,
        notifyByBrowser,
        active,
      );
      response.json({ updated });
    } catch (err) {
      if (err instanceof Error) {
        response.status(400).json({ error: err.message });
      }
      next(err);
    }
  },
);

/**
 * Endpoint for deleting a Notification for a given User.
 * @param {string} notification_id - ID of the Notification to be deleted
 */
notificationsRouter.delete(
  '/:notification_id',
  async (request, response, next) => {
    try {
      const { notification_id } = request.params;
      const user_id = request.user.id;

      const deleteNotification = new DeleteNotificationService();

      const deleted = await deleteNotification.execute(
        user_id,
        notification_id,
      );
      response.json({ deleted });
    } catch (err) {
      if (err instanceof Error) {
        response.status(400).json({ error: err.message });
      }
      next(err);
    }
  },
);

export default notificationsRouter;
