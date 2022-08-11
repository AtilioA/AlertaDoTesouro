import { Router } from 'express';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

/**
 * @class TokenPayload
 * @description Interface for the payload of the JWT token
 *
 * @property {number} iat - 'Issued at' timestamp
 * @property {number} exp - 'Expiration' timestamp
 * @property {json} user - JSON with User data
 */
interface TokenPayload {
  iat: number;
  exp: number;
  user: {
    email: string;
    id: string;

    created_at: string;

    updated_at: string;
  };
}

const emailRouter = Router();

/**
 * Endpoint for confirming an email address for a User.
 * Requires a valid token.
 */
emailRouter.get('/confirmation/:token', async (request, response, next) => {
  try {
    const { token } = request.params;

    const decoded = verify(token, authConfig.jwt.secret as string);
    const { user } = decoded as TokenPayload;

    const usersRepository = getRepository(User);
    await usersRepository.update({ id: user.id }, { confirmed: true });

    console.log(
      `Account of e-mail ${user.email} has been confirmed successfully.`,
    );
    response.json({ ok: true, user });
    // return response.Navigate('/');  // Return to homepage
  } catch (err) {
    if (err instanceof Error) {
      response
        .status(400)
        .json({ error: `Link de confirmação inválido: ${err.message}` });
    }
    next(err);
  }
});

export default emailRouter;
