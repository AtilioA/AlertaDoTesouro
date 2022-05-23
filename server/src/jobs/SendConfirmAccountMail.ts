// Job for mailing email confirmation

import MailService from '../services/MailService';

/**
 * @class ConfirmAccountEmail
 * @description BeeQueue Job for mailing email confirmation
 */
class ConfirmAccountEmail {
  // Unique job key
  get key() {
    return 'ConfirmAccountEmail';
  }

  // Job task
  async handle(data: any) {
    const { token, user } = data.data;

    await MailService.sendMail({
      to: `<${user.email}>`,
      subject: `Alerta do Tesouro - Confirme seu e-mail`,
      text: `<h1>Alerta do Tesouro</h1>`,
      template: 'confirm-account',
      context: {
        token,
      },
    });

    console.log(`confirm-account email was just sent to '${user.email}'.`);
  }
}

export default new ConfirmAccountEmail();
