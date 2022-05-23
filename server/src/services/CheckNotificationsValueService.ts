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

    const treasuryBonds = await treasuryBondRepository.find({
      where: { lastDateOfNegotiation: IsNull() },
      relations: ['notifications', 'notifications.user'],
    });

    // Check if there are any treasury bonds that exceed the conditions of any notification
    for (const treasuryBond of treasuryBonds) {
      for (const notification of treasuryBond.notifications) {
        if (!treasuryBond.lastDateOfNegotiation) {
          switch (notification.type) {
            case 'maior':
              if (
                treasuryBond.annualInvestmentRate > notification.value &&
                notification.active &&
                notification.user.notify
              ) {
                if (notification.user.notifyByEmail) {
                  await Queue.add(NotifyBondReturns.key, {
                    notification,
                    treasuryBond,
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
                treasuryBond.annualInvestmentRate < notification.value &&
                notification.active &&
                notification.user.notify
              ) {
                if (notification.user.notifyByEmail) {
                  await Queue.add(NotifyBondReturns.key, {
                    notification,
                    treasuryBond,
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
