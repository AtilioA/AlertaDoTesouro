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

    created_at: string;

    updated_at: string;
  };
}

const emailRouter = Router();

// Confirm email (user) endpoint
emailRouter.get('/confirmation/:token', async (request, response, next) => {
  try {
    const { token } = request.params;

    const decoded = verify(token, authConfig.jwt.secret as string);
    const { user } = decoded as TokenPayload;

    const usersRepository = getRepository(User);
    await usersRepository.update({ id: user.id }, { confirmed: true });

    response.json({ ok: true, user });
    // return response.redirect('/');  // Return to homepage
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
