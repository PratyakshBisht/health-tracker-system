import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../application/services/auth-service';
import { UserRepository } from '../infrastructure/repositories/user-repository';
import { getPrismaClient } from '../infrastructure/database';
import { AppError } from './error-handler';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function createAuthMiddleware() {
  const prisma = getPrismaClient();
  const userRepository = new UserRepository(prisma);
  const authService = new AuthService(userRepository);

  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError(401, 'Missing or invalid authorization header');
      }

      const token = authHeader.slice(7);
      const payload = authService.verifyAccessToken(token);
      req.userId = payload.userId;
      next();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(401, 'Invalid or expired token');
    }
  };
}
