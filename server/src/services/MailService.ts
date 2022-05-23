import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

/**
 * @class NodeMail
 * @description Class for sending emails
 */
class NodeMail {
  public transporter: any;

  /**
   * Configure the templates for the emails to be sent, using handlebars for the template engine.
   */
  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerExpressHandlebars({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          // default: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      }),
    );
  }

  constructor() {
    this.transporter = nodemailer.createTransport({
      port: Number(mailConfig.port),
      host: String(mailConfig.host),
      secure: Boolean(mailConfig.secure),
      auth: mailConfig.auth,
      tls: mailConfig.tls,
    });

    this.configureTemplates();
  }

  /**
   * Send an email.
   *
   * @param mailMessage - The message to be sent
   */
  sendMail(mailMessage: any): any {
    return this.transporter.sendMail({
      from: 'centraldoapito@alertadotesouro.com',
      ...mailMessage,
    });
  }
}

export default new NodeMail();
