import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';
import {
  RegisterUserPayload,
  LoginUserPayload,
  User,
} from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user-repository';
import { logger } from '../../config/logger';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: Omit<User, 'password'>;
}

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(payload: RegisterUserPayload): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(payload.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      payload.password,
      config.bcrypt.saltRounds,
    );

    // Create user
    const user = await this.userRepository.create({
      email: payload.email,
      password: hashedPassword,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });

    logger.info(`New user registered: ${user.email}`);

    // Generate tokens
    const tokens = this.generateTokens(user.id);

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      ...tokens,
      user: userWithoutPassword,
    };
  }

  async login(payload: LoginUserPayload): Promise<AuthResponse> {
    // Find user
    const user = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    logger.info(`User logged in: ${user.email}`);

    // Generate tokens
    const tokens = this.generateTokens(user.id);

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      ...tokens,
      user: userWithoutPassword,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret,
      ) as { userId: string };

      // Verify user still exists
      const user = await this.userRepository.findById(payload.userId);
      if (!user) {
        throw new Error('User not found');
      }

      logger.info(`Token refreshed for user: ${user.email}`);

      // Generate new tokens
      return this.generateTokens(user.id);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  private generateTokens(userId: string): AuthTokens {
    const accessToken = jwt.sign(
      { userId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiryTime },
    );

    const refreshToken = jwt.sign(
      { userId },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiryTime },
    );

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, config.jwt.secret) as { userId: string };
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }
}
