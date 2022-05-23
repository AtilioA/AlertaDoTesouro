import { getConnection, DeleteResult, getRepository } from 'typeorm';
import Notification from '../models/Notification';

/**
 * Service for deleting a Notification.
 */
class DeleteNotificationService {
  public async execute(
    user_id: string,
    notification_id: string,
  ): Promise<DeleteResult> {
    const notificationRepository = getRepository(Notification);
    const findNotification = await notificationRepository.findOne({
      where: { user_id },
    });

    if (!findNotification) {
      throw new Error('This notification does not exist.');
    }

    if (findNotification.user_id !== user_id) {
      throw new Error('This notification was not created by this user.');
    }

    const deleteNotification = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Notification)
      .where('id = :notification_id', { notification_id })
      .execute();

    return deleteNotification;
  }
}

export default DeleteNotificationService;
