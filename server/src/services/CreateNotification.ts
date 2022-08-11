// Service for creating new notification and saving it in the database

import { getCustomRepository, getRepository } from 'typeorm';
import Notification, { nType } from '../models/Notification';
import NotificationsRepository from '../repositories/NotificationsRepository';
import TreasuryBond from '../models/TreasuryBond';
import User from '../models/User';

/**
 * Interface for the request object for creating a new Notification.
 */
interface Request {
  user_id: string;
  bond_id: string;
  value: number;
  type: nType;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
  active: boolean;
}

/**
 * @class CreateNotificationService
 * @description Function for creating a new Notification using parameters from the request object
 */
export default async function createNotification({
  user_id,
  bond_id,
  value,
  type,
  notifyByEmail,
  notifyByBrowser,
  active,
}: Request): Promise<Notification> {
  const notificationsRepository = getCustomRepository(NotificationsRepository);
  const userRepository = getRepository(User);

  // Get the string according to the type of the notification (e.g. 'maior' or 'menor')
  type = notificationsRepository.checkEnum(type);

  // Check if there is already a notification for the same treasury bond
  const notificationForTheSameBond = await notificationsRepository.findOne({
    where: { user: { id: user_id }, bond: { id: bond_id } },
  });
  // User can only create one notification per bond
  if (notificationForTheSameBond) {
    throw Error('A notification for this bond and user already exists.');
  }

  // Fetch the TreasuryBond to be included related to the Notification
  const treasuryBondRepository = getRepository(TreasuryBond);
  const bond = (await treasuryBondRepository.findOne({
    id: bond_id,
  })) as TreasuryBond;
  // Fetch the full user entity
  const user = await userRepository.findOne({
    where: { id: user_id },
  });

  const notification = notificationsRepository.create({
    user,
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
