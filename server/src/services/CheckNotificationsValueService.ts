import { getRepository, IsNull } from 'typeorm';
import Notification from '../models/Notification';
import TreasuryBond from '../models/TreasuryBond';
import Queue from './Queue';
import NotifyBondReturns from '../jobs/NotifyBondReturns';
import { response } from 'express';

class CheckNotificationsValueService {
  public async execute(): Promise<boolean> {
    const notificationRepository = getRepository(Notification);
    const treasuryBondRepository = getRepository(TreasuryBond);

    const treasuryBonds = await treasuryBondRepository.find({
      where: { lastDateOfNegotiation: IsNull() },
      relations: ['notifications', 'notifications.user'],
    });

    for (let treasuryBond of treasuryBonds) {
      for (let notification of treasuryBond.notifications) {
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
  catch(err) {
    throw new Error(
      "Failed while trying to check notifications' values:" + err.message,
    );
  }
}

export default CheckNotificationsValueService;
