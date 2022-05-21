// Middleware that logs requests (method, endpoint, time taken)

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that logs requests (method, endpoint, time taken)
 *
 * @param request Express request object
 * @param _ (unused) Response object
 * @param next Next function
 */
export default function logRequest(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] request to ${url}`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}
