// Job for mailing bond return notification

// import Mail from '../../lib/Mail';
import Notification from '../models/Notification';
import TreasuryBond from '../models/TreasuryBond';
import MailService from '../services/MailService';

/**
 * @class NotifyBondMailInterface
 * @description Interface for the mailing of bond returns
 * @property {Notification} notification - The Notification related to the email
 * @property {TreasuryBond} bond - The TreasuryBond related to the email
 */
interface NotifyBondMailInterface {
  notification: Notification;
  treasuryBond: TreasuryBond;
}

/**
 * @class NotifyBondReturns
 * @description BeeQueue Job for mailing bond return notification
 */
class NotifyBondReturns {
  // Unique job key
  get key() {
    return 'NotifyBondReturns';
  }

  // Job task
  async handle(data: any) {
    const { notification, treasuryBond } = data.data;
    const user = data.data.findUser;

    await MailService.sendMail({
      to: `<${user.email}>`,
      subject: `${treasuryBond.name || 'Um título'} agora tem retorno ${
        notification.type
      } que ${notification.value}%!`,
      template: 'notify-bond-returns',
      context: {
        treasurybond: treasuryBond,
        notification,
      },
    });

    console.log(`notify-bond-returns email was just sent to '${user.email}'.`);
  }
}

export default new NotifyBondReturns();
