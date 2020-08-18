import Notification from '../models/Notification';
// import TreasuryBond from '../models/TreasuryBond';
// import notificationsRouter from '../routes/notification.routes';
import { EntityRepository, Repository } from 'typeorm';

// interface CreateNotificationDTO {
//   bond: TreasuryBond;
//   value: number;
//   type: number;
//   notifyByEmail: boolean;
//   notifyByBrowser: boolean;
// }

@EntityRepository(Notification)
class NotificationRepository extends Repository<Notification> {
  public async findByCode(code: number): Promise<Notification | null> {
    const findNotification = await this.findOne({
      where: {
        value: code,
      },
    });

    return findNotification || null;
  }
}

export default NotificationRepository;
