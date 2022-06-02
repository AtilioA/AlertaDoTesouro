// Service for creating new notification and saving it in the database

import { getCustomRepository, getRepository } from 'typeorm';
import Notification, { nType } from '../models/Notification';
import NotificationsRepository from '../repositories/NotificationsRepository';
import TreasuryBond from '../models/TreasuryBond';

/**
 * Interface for the request object for creating a new Notification.
 */
interface Request {
  user_id: string;
  treasurybond_id: string;
  value: number;
  type: nType;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
  active: boolean;
}

/**
 * @class CreateNotificationService
 * @description Service for creating a new Notification.
 */
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

    // Get the string according to the type of the notification (e.g. 'maior' or 'menor')
    type = notificationsRepository.checkEnum(type);

    // Check if there is already a notification for the same treasury bond
    const notifications = await notificationsRepository.find({
      where: { user_id },
    });
    const findNotificationForTheSameBond = notifications.find(
      notification => notification.treasurybond_id === treasurybond_id,
    );
    // User can only create one notification per bond
    if (findNotificationForTheSameBond) {
      throw Error('A notification for this bond and user already exists.');
    }

    // Fetch the TreasuryBond to be included related to the Notification
    const treasuryBondRepository = getRepository(TreasuryBond);
    const bond: TreasuryBond | undefined  = await treasuryBondRepository.findOne({ id: treasurybond_id });

    const notification = notificationsRepository.create({
      user_id,
      treasurybond_id,
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
