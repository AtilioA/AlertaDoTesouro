import Notification, { nType } from '../models/Notification';
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
  // STUB: Find notification by bond code
  public async findByCode(id: string): Promise<Notification | null> {
    const findNotification = await this.findOne({
      where: {
        treasurybond_id: id,
      },
    });

    return findNotification || null;
  }

  // Get notification type from nType enum
  public checkEnum(type: string): nType {
    switch (type) {
      case nType.LESS: {
        return nType.LESS;
      }
      default: {
        return nType.GREATER;
      }
    }
  }
}

export default NotificationRepository;
