import { Request, Response } from 'express';
import { AuthService } from '../../application/services/auth-service';
import { RegisterUserSchema, LoginUserSchema, RefreshTokenSchema } from '../../domain/user';
import { logger } from '../../config/logger';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const payload = RegisterUserSchema.parse(req.body);
      const result = await this.authService.register(payload);
      res.status(201).json({
        success: true,
        data: result,
        message: 'User registered successfully',
      });
    } catch (error) {
      logger.error('Registration error', error);
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Registration failed',
        });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const payload = LoginUserSchema.parse(req.body);
      const result = await this.authService.login(payload);
      res.status(200).json({
        success: true,
        data: result,
        message: 'Login successful',
      });
    } catch (error) {
      logger.error('Login error', error);
      if (error instanceof Error) {
        res.status(401).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Login failed',
        });
      }
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const payload = RefreshTokenSchema.parse(req.body);
      const tokens = await this.authService.refreshToken(payload.refreshToken);
      res.status(200).json({
        success: true,
        data: tokens,
        message: 'Token refreshed successfully',
      });
    } catch (error) {
      logger.error('Token refresh error', error);
      if (error instanceof Error) {
        res.status(401).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Token refresh failed',
        });
      }
    }
  }
}
