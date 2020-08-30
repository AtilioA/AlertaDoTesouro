// import Mail from '../../lib/Mail';
import Notification from '../models/Notification';
import TreasuryBond from '../models/TreasuryBond';
import MailService from '../services/MailService';

interface NotifyBondMailInterface {
  notification: Notification;
  treasuryBond: TreasuryBond;
}

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
        notification: notification,
      },
    });

    console.log(`notify-bond-returns email was just sent to '${user.email}'.`);
  }
}

export default new NotifyBondReturns();
