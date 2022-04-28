import { EntityRepository, Repository } from 'typeorm';
import Notification, { nType } from '../models/Notification';

@EntityRepository(Notification)
class NotificationRepository extends Repository<Notification> {
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
