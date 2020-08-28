import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { verify } from 'jsonwebtoken';
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

// Create users endpoint
emailRouter.get('/confirmation/:token', async (request, response) => {
  try {
    const { token } = request.params;

    const decoded = verify(token, authConfig.jwt.secret);
    const { user } = decoded as TokenPayload;

    const usersRepository = getRepository(User);
    await usersRepository.update({ id: user.id }, { confirmed: true });

    // return response.json({ ok: true, findUser });
    return response.redirect('/');
  } catch (error) {
    return response
      .status(400)
      .json({ error: 'Link de confirmação inválido: ' + error.message });
  }
});

export default emailRouter;
