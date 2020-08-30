import { getRepository, IsNull } from 'typeorm';
import Notification from '../models/Notification';
import TreasuryBond from '../models/TreasuryBond';
import Queue from './Queue';
import NotifyBondReturns from '../jobs/NotifyBondReturns';

class CheckNotificationsValueService {
  public async execute(): Promise<any> {
    const notificationRepository = getRepository(Notification);
    const treasuryBondRepository = getRepository(TreasuryBond);

    const treasuryBonds = await treasuryBondRepository.find({
      where: { lastDateOfNegotiation: IsNull() },
      relations: ['notifications', 'notifications.user'],
    });

    // const notificationsList = await notificationRepository.find({
    //   where: { active: true },
    //   relations: ['user', 'bond'],
    // });

    for (let treasuryBond of treasuryBonds) {
      for (let notification of treasuryBond.notifications) {
        // const findTreasuryBond = treasuryBonds.find(
        //   treasurybond => treasurybond.id === notification.bond.id,
        // );

        if (!treasuryBond.lastDateOfNegotiation) {
          switch (notification.type) {
            case 'maior':
              if (
                treasuryBond.annualInvestmentRate > notification.value &&
                notification.active &&
                notification.user.notify
              ) {
                // console.log(
                // `${treasuryBond.annualInvestmentRate} > ${notification.value}. Envia notificação!`,
                // );

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
                }
              }
              break;
            default:
              if (
                treasuryBond.annualInvestmentRate < notification.value &&
                notification.active &&
                notification.user.notify
              ) {
                // console.log(
                // `${treasuryBond.annualInvestmentRate} > ${notification.value}. Envia notificação!`,
                // );

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
