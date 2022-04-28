import { UpdateResult, getCustomRepository } from 'typeorm';
import { nType } from '../models/Notification';
import NotificationRepository from '../repositories/NotificationsRepository';

class UpdateNotificationService {
  public async execute(
    user_id: string,
    notification_id: string,
    value: number,
    type: nType,
    notifyByEmail: boolean,
    notifyByBrowser: boolean,
    active: boolean,
  ): Promise<UpdateResult> {
    const notificationsRepository = getCustomRepository(NotificationRepository);

    const findNotification = await notificationsRepository.findOne({
      where: { user_id },
    });

    if (!findNotification) {
      throw new Error('This notification does not exist.');
    }

    if (findNotification.user_id !== user_id) {
      throw new Error('This notification was not created by this user.');
    }

    const enumType = notificationsRepository.checkEnum(type);

    const updateResult = await notificationsRepository.update(
      { id: notification_id },
      { value, type: enumType, notifyByBrowser, notifyByEmail, active },
    );

    return updateResult;
  }
}

export default UpdateNotificationService;
