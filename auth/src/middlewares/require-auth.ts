import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorized-error';

export default function requireAuth(
  req: Request, 
  _: Response, 
  next: NextFunction) {
  if (!req.currentUser) {
    throw new UnauthorizedError();
  }

  next();
}