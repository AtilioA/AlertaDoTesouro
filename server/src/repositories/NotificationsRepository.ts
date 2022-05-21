import { EntityRepository, Repository } from 'typeorm';
import Notification, { nType } from '../models/Notification';

/**
 * @class NotificationsRepository
 * @description Repository for the Notification entity. It's used to perform CRUD operations on the database.
 * @see Notification
 *
 */
@EntityRepository(Notification)
class NotificationRepository extends Repository<Notification> {
  /**
   * @description Get notification type from nType enum.
   * @param type Notification type (lower than or greater than).
   */
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
