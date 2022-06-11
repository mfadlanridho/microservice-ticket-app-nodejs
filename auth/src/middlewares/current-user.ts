import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/// <summary>
/// middleware to get jwt payload
/// </summary>

interface UserPayload {
  id: string;
  email: string;
}

// add additional property to Request
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// next() => continue to next middleware
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (e) { }

  next();
};