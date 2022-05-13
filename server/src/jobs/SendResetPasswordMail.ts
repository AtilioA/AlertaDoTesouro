// Job for mailing password reset 'token'

import MailService from '../services/MailService';

class ResetPasswordEmail {
  // Unique job key
  get key() {
    return 'ResetPasswordEmail';
  }

  // Job task
  async handle(data: any) {
    const { token, user } = data.data;
    console.log(`Reset password email is being sent to '${user.email}'. Token: ${token}. User: ${JSON.stringify(user)}`);

    await MailService.sendMail({
      to: `<${user.email}>`,
      subject: `Alerta do Tesouro - Redefine sua senha`,
      text: `<h1>Alerta do Tesouro</h1>`,
      template: 'reset-password',
      context: {
        token,
      },
    });

    console.log(`reset-password email was just sent to '${user.email}'.`);
  }
}

export default new ResetPasswordEmail();
