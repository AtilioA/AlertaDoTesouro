import Notification from '../models/Notification';
import NotificationsRepository from '../repositories/NotificationsRepository';
import TreasuryBond from '../models/TreasuryBond';

interface Request {
  bond: TreasuryBond;
  value: number;
  type: number;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
}

class CreateNotificationService {
  private notificationsRepository: NotificationsRepository;

  constructor(notificationsRepository: NotificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }

  public execute({
    bond,
    value,
    type,
    notifyByEmail,
    notifyByBrowser,
  }: Request): Notification {
    const findNotificationForTheSameBond = this.notificationsRepository.findByCode(
      bond.code,
    );

    if (findNotificationForTheSameBond) {
      throw Error('A notification for this bond already exists.');
    }

    const notification = this.notificationsRepository.create({
      bond,
      value,
      type,
      notifyByEmail,
      notifyByBrowser,
    });

    return notification;
  }
}

export default CreateNotificationService;
