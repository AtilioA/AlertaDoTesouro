import { UpdateResult, getCustomRepository } from 'typeorm';
import type User from '../models/User';
import type Notification from '../models/Notification';
import NotificationRepository from '../repositories/NotificationsRepository';

type UpdateNotificationArgs = Pick<
  Notification,
  'value' | 'type' | 'notifyByEmail' | 'notifyByBrowser' | 'active'
> & {
  user: Pick<User, 'id'>;
  notification: Pick<Notification, 'id'>;
};

/**
 * @description Service for updating a Notification.
 */
export default async function updateNotification({
  user,
  notification,
  value,
  type,
  notifyByEmail,
  notifyByBrowser,
  active,
}: UpdateNotificationArgs): Promise<UpdateResult> {
  const notificationsRepository = getCustomRepository(NotificationRepository);
  const findNotification = await notificationsRepository.findOne({
    where: { user: { id: user } },
  });

  if (!findNotification) {
    throw new Error('This notification does not exist.');
  }

  if (findNotification.user.id !== user.id) {
    throw new Error('This notification was not created by this user.');
  }

  const enumType = notificationsRepository.checkEnum(type);

  const updateResult = await notificationsRepository.update(
    { id: notification.id },
    { value, type: enumType, notifyByBrowser, notifyByEmail, active },
  );

  return updateResult;
}
