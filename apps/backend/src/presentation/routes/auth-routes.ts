import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { AuthService } from '../../application/services/auth-service';
import { UserRepository } from '../../infrastructure/repositories/user-repository';
import { getPrismaClient } from '../../infrastructure/database';

export function createAuthRoutes(): Router {
  const router = Router();

  // Initialize dependencies
  const prisma = getPrismaClient();
  const userRepository = new UserRepository(prisma);
  const authService = new AuthService(userRepository);
  const authController = new AuthController(authService);

  // Routes
  router.post('/register', (req, res) => authController.register(req, res));
  router.post('/login', (req, res) => authController.login(req, res));
  router.post('/refresh', (req, res) => authController.refreshToken(req, res));

  return router;
}
