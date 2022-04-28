import { Router } from 'express';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  user: {
    email: string;
    id: string;
    // eslint-disable-next-line camelcase
    created_at: string;
    // eslint-disable-next-line camelcase
    updated_at: string;
  };
}

const emailRouter = Router();

// Confirm email (user) endpoint
emailRouter.get('/confirmation/:token', async (request, response) => {
  try {
    const { token } = request.params;

    const decoded = verify(token, authConfig.jwt.secret as string);
    const { user } = decoded as TokenPayload;

    const usersRepository = getRepository(User);
    await usersRepository.update({ id: user.id }, { confirmed: true });

    return response.json({ ok: true, user });
    // return response.redirect('/');  // Return to homepage
  } catch (error) {
    return response
      .status(400)
      .json({ error: `Link de confirmação inválido: ${error.message}` });
  }
});

export default emailRouter;
