import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import RequestValidationError from '../errors/request-validation-error';

export default function validateRequests(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};