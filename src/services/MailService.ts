import nodemailer from 'nodemailer';
import { resolve } from 'path';
// import exphbs from 'express-handlebars';
// import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';
class NodeMail {
  public transporter: any;

  // configureTemplates() {
  // console.log('a');
  // const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

  // this.transporter.use(
  //   'compile',
  //   nodemailerhbs({
  //     viewEngine: exphbs.create({
  //       layoutsDir: resolve(viewPath, 'layouts'),
  //       partialsDir: resolve(viewPath, 'partials'),
  //       default: 'default',
  //       extname: '.hbs',
  //     }),
  //     viewPath,
  //     extName: '.hbs',
  //   })
  // );
  // }

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: mailConfig.auth,
      tls: mailConfig.tls,
    });

    // this.configureTemplates();
  }

  sendMail(mailMessage: any): any {
    return this.transporter.sendMail({
      from: 'alertadotesouro@gmail.com',
      ...mailMessage,
    });
  }
}

export default new NodeMail();
