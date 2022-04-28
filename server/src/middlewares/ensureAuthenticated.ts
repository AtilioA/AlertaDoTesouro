// Middleware that checks if an user is authenticated (proceed if they are)

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JSON Web Token is missing');
  }

  const [, token] = authHeader.split(' '); // Do not use "type" of token (Bearer)

  try {
    const decoded = verify(token, authConfig.jwt.secret as string);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error(`Invalid JSON Web Token: ${err.message}`);
  }
}
