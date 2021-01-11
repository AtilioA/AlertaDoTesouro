// Middleware that logs requests (method, endpoint, time taken)

import { Request, Response, NextFunction } from 'express';

export default function logRequests(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] request to ${url}`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}
