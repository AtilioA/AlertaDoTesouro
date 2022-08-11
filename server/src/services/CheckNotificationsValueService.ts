import { getRepository, IsNull } from 'typeorm';
import Notification from '../models/Notification';
import TreasuryBond from '../models/TreasuryBond';
import Queue from './Queue';
import NotifyBondReturns from '../jobs/NotifyBondReturns';

/**
 * Service for checking if a notification needs to be sent to a User.
 */
class CheckNotificationsValueService {
  public async execute(): Promise<boolean> {
    const notificationRepository = getRepository(Notification);
    const treasuryBondRepository = getRepository(TreasuryBond);

    const treasuryBond = await treasuryBondRepository.find({
      where: { lastDateOfNegotiation: IsNull() },
      relations: ['notifications', 'notifications.user'],
    });

    // Check if there are any treasury bond that exceed the conditions of any notification
    for (const bond of treasuryBond) {
      for (const notification of bond.notifications) {
        if (!bond.lastDateOfNegotiation) {
          switch (notification.type) {
            case 'maior':
              if (
                bond.annualInvestmentRate > notification.value &&
                notification.active &&
                notification.user.notify
              ) {
                if (notification.user.notifyByEmail) {
                  await Queue.add(NotifyBondReturns.key, {
                    notification,
                    treasuryBond: bond,
                    findUser: notification.user,
                  });

                  await notificationRepository.update(
                    { id: notification.id },
                    {
                      active: false,
                    },
                  );
                  console.log('Notification has been updated (now inactive).');
                }
              }
              break;
            default:
              if (
                bond.annualInvestmentRate < notification.value &&
                notification.active &&
                notification.user.notify
              ) {
                if (notification.user.notifyByEmail) {
                  await Queue.add(NotifyBondReturns.key, {
                    notification,
                    treasuryBond: bond,
                    findUser: notification.user,
                  });

                  await notificationRepository.update(
                    { id: notification.id },
                    {
                      active: false,
                    },
                  );
                  console.log('Notification has been updated (now inactive).');
                }
              }
              break;
          }
        }
      }
    }

    return true;
  }
}

export default CheckNotificationsValueService;
