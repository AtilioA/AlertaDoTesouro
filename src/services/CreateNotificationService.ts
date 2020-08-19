// Service for creating new notification and saving it in the database

import { getCustomRepository } from 'typeorm';
import Notification, { nType } from '../models/Notification';
import NotificationsRepository from '../repositories/NotificationsRepository';
interface Request {
  user_id: string;
  treasurybond_id: string;
  value: number;
  type: nType;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
  active: boolean;
}

class CreateNotificationService {
  public async execute({
    user_id,
    treasurybond_id,
    value,
    type,
    notifyByEmail,
    notifyByBrowser,
    active,
  }: Request): Promise<Notification> {
    const notificationsRepository = getCustomRepository(
      NotificationsRepository,
    );

    type = notificationsRepository.checkEnum(type);

    const findNotificationForTheSameBond = await notificationsRepository.findByCode(
      // bond.code,
      value,
    );

    // User can only create one notification per bond
    if (findNotificationForTheSameBond) {
      throw Error('A notification for this bond and user already exists.');
    }

    const notification = notificationsRepository.create({
      user_id,
      treasurybond_id,
      value,
      type,
      notifyByEmail,
      notifyByBrowser,
      active,
    });

    await notificationsRepository.save(notification);

    return notification;
  }
}

export default CreateNotificationService;
