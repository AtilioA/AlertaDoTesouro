// Service for creating new notification and saving it in the database

import Notification, { nType } from '../models/Notification';
import NotificationsRepository from '../repositories/NotificationsRepository';
import TreasuryBond from '../models/TreasuryBond';
import { getCustomRepository } from 'typeorm';
interface Request {
  bond: TreasuryBond;
  value: number;
  type: nType;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
  active: boolean;
}

class CreateNotificationService {
  public async execute({
    bond,
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
      bond.code,
      // value,
    );

    // User can only create one notification per bond
    if (findNotificationForTheSameBond) {
      throw Error('A notification for this bond already exists.');
    }

    const notification = notificationsRepository.create({
      bond,
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
