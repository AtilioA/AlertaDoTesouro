import { sign } from 'jsonwebtoken';
import SendConfirmAccountMail from '../jobs/SendConfirmAccountMail';
import User from '../models/User';
import Queue from '../services/Queue';
import authConfig from '../config/auth';

export default function sendConfirmationMail(user: User): void {
  const EMAIL_SECRET = authConfig.jwt.secret;
  const emailToken = sign(
    {
      user,
    },
    EMAIL_SECRET as string,
    {
      expiresIn: authConfig.jwt.expiresIn,
    },
  );

  // Add confirmation email task to the queue, so that it will be sent to the user
  Queue.add(SendConfirmAccountMail.key, {
    token: emailToken,
    user,
  });
}
