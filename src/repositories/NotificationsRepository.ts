import Notification from '../models/Notification';
import TreasuryBond from '../models/TreasuryBond';
import notificationsRouter from '../routes/notification.routes';

interface CreateNotificationDTO {
  bond: TreasuryBond;
  value: number;
  type: number;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
}

class NotificationRepository {
  private notifications: Notification[];

  constructor() {
    this.notifications = [];
  }

  public all() {
    return this.notifications;
  }

  public create({
    bond,
    value,
    type,
    notifyByEmail,
    notifyByBrowser,
  }: CreateNotificationDTO): Notification {
    const notification = new Notification({
      bond,
      value,
      type,
      notifyByEmail,
      notifyByBrowser,
    });

    this.notifications.push(notification);

    return notification;
  }

  public findByCode(code: number): Notification | null {
    const findNotification = this.notifications.find(
      notification => notification.bond.code === code,
    );

    return findNotification || null;
  }
}

export default NotificationRepository;
