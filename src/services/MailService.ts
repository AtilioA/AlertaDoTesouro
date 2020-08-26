import * as nodemailer from 'nodemailer';
import MailConfig from '../config/mail';

class Mail {
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string,
  ) {}

  sendMail() {
    let mailOptions = {
      from: 'alertadotesouro@gmail.com',
      to: this.to,
      subject: this.subject,
      html: this.message,
    };

    const transporter = nodemailer.createTransport({
      host: MailConfig.host,
      port: MailConfig.port,
      secure: false,
      auth: {
        user: MailConfig.user,
        pass: MailConfig.password,
      },
      tls: { rejectUnauthorized: false },
    });

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return error;
      } else {
        return 'E-mail was sent successfully!';
      }
    });
  }
}

export default new Mail();
