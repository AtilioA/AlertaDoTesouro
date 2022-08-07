import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import NotificationsRepository from '../repositories/NotificationsRepository';
import createNotification from '../services/CreateNotification';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import deleteNotification from '../services/DeleteNotification';
import updateNotification from '../services/UpdateNotification';
import User from '../models/User';
import type { TypedRequestBody } from '../@types/express';
import type Notification from '../models/Notification';

const notificationsRouter = Router();
const userRepository = getRepository(User);
const notificationsRepository = getCustomRepository(NotificationsRepository);

// All notifications routes require authentication
notificationsRouter.use(ensureAuthenticated);

/**
 * Endpoint for listing all notifications for a given User.
 */
notificationsRouter.get('/', async (request, response, next) => {
  try {
    const { user } = request;
    const notifications = await notificationsRepository.find({
      where: { user: { id: user.id } },
    });

    return response.json(notifications);
  } catch (err) {
    next(err);
  }
});

/**
 * Endpoint for creating a new Notification for a given User.
 */
notificationsRouter.post(
  '/',
  async (request: TypedRequestBody<Notification>, response, next) => {
    try {
      const {
        user,
        body: { bond, value, type, notifyByEmail, notifyByBrowser, active },
      } = request;

      // Create and save it in the database
      const notification = await createNotification({
        user_id: user.id,
        bond_id: bond.id,
        value,
        type,
        notifyByEmail,
        notifyByBrowser,
        active,
      });

      const findUser = await userRepository.findOne({
        where: { id: user.id },
      });

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
  },
);

/**
 * Endpoint for updating a Notification for a given User.
 * @param {string} notification_id - ID of the Notification to be updated
 */
notificationsRouter.put(
  '/:notification_id',
  async (request: TypedRequestBody<Notification>, response, next) => {
    try {
      const {
        user,
        body: { value, type, notifyByEmail, notifyByBrowser, active },
        params: { notification_id },
      } = request;

      const updated = await updateNotification({
        user,
        notification: { id: notification_id },
        value,
        type,
        notifyByEmail,
        notifyByBrowser,
        active,
      });
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
      const {
        user,
        params: { notification_id },
      } = request;

      const deleted = await deleteNotification(user, { id: notification_id });
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
