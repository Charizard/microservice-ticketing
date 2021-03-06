import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

interface UserPayload {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export default function currentUser(
  req: Request,
  _: Response,
  next: NextFunction) {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    // Verify the JWT token
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as UserPayload;

    req.currentUser = payload;
  } catch (err) {  }
  
  next();
};