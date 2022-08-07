import { DeleteResult, getRepository } from 'typeorm';
import Notification from '../models/Notification';
import type User from '../models/User';

/**
 * Service for deleting a Notification.
 */
export default async function deleteNotification(
  user: Pick<User, 'id'>,
  notification: Pick<Notification, 'id'>,
): Promise<DeleteResult> {
  const notificationRepository = getRepository(Notification);
  const findNotification: Notification | undefined =
    await notificationRepository.findOne({
      where: { user, id: notification.id },
    });

  if (!findNotification) {
    throw new Error('This notification does not exist.');
  }

  if (findNotification.user.id !== user.id) {
    throw new Error('This notification was not created by this user.');
  }

  const deleted = await notificationRepository.delete(findNotification);
  // const deleteNotification = await getConnection()
  //   .createQueryBuilder()
  //   .delete()
  //   .from(Notification)
  //   .where('id = :notification', { notification_id })
  //   .execute();

  return deleted;
}
