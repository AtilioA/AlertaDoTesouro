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
    const { notification } = data.data;
    const user = data.data.findUser;

    await MailService.sendMail({
      to: `<${user.email}>`,
      subject: `${notification.bond.name || 'Um título'} agora tem retorno ${
        notification.type
      } que ${notification.value}%!`,
      text: `<h1>Alerta do Tesouro</h1>
${notification.bond.name || 'Um título'} tem retorno ao ano ${
        notification.type
      } que ${notification.value}% agora!`,

      template: 'notify-bond-returns',
      context: {
        treasurybond: notification.bond,
        notification: notification,
      },
    });

    console.log(`notify-bond-returns email was just sent to '${user.email}'.`);
  }
}

export default new NotifyBondReturns();
