import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AuthService } from '../src/application/services/auth-service';
import { UserRepository } from '../src/infrastructure/repositories/user-repository';
import { RegisterUserPayload, LoginUserPayload } from '../src/domain/user';

let prisma: PrismaClient;
let userRepository: UserRepository;
let authService: AuthService;

beforeAll(() => {
  prisma = new PrismaClient();
  userRepository = new UserRepository(prisma);
  authService = new AuthService(userRepository);
});

afterAll(async () => {
  // Clean up test data
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe('AuthService', () => {
  describe('register', () => {
    it('should register a new user successfully', async () => {
      const payload: RegisterUserPayload = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };

      const result = await authService.register(payload);

      expect(result.user.email).toBe(payload.email);
      expect(result.user.firstName).toBe(payload.firstName);
      expect(result.user.lastName).toBe(payload.lastName);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.user.password).toBeUndefined();
    });

    it('should throw error if user already exists', async () => {
      const payload: RegisterUserPayload = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Jane',
        lastName: 'Doe',
      };

      await expect(authService.register(payload)).rejects.toThrow(
        'User with this email already exists',
      );
    });
  });

  describe('login', () => {
    beforeAll(async () => {
      // Create a test user
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      await prisma.user.create({
        data: {
          email: 'login@example.com',
          password: hashedPassword,
          firstName: 'John',
          lastName: 'Doe',
        },
      });
    });

    it('should login user successfully', async () => {
      const payload: LoginUserPayload = {
        email: 'login@example.com',
        password: 'Password123!',
      };

      const result = await authService.login(payload);

      expect(result.user.email).toBe(payload.email);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.user.password).toBeUndefined();
    });

    it('should throw error for invalid email', async () => {
      const payload: LoginUserPayload = {
        email: 'nonexistent@example.com',
        password: 'Password123!',
      };

      await expect(authService.login(payload)).rejects.toThrow(
        'Invalid email or password',
      );
    });

    it('should throw error for invalid password', async () => {
      const payload: LoginUserPayload = {
        email: 'login@example.com',
        password: 'WrongPassword123!',
      };

      await expect(authService.login(payload)).rejects.toThrow(
        'Invalid email or password',
      );
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      // First login to get tokens
      const loginPayload: LoginUserPayload = {
        email: 'login@example.com',
        password: 'Password123!',
      };

      const loginResult = await authService.login(loginPayload);
      const newTokens = await authService.refreshToken(loginResult.refreshToken);

      expect(newTokens.accessToken).toBeDefined();
      expect(newTokens.refreshToken).toBeDefined();
      expect(newTokens.accessToken).not.toBe(loginResult.accessToken);
    });

    it('should throw error for invalid refresh token', async () => {
      const invalidToken = 'invalid.jwt.token';

      await expect(authService.refreshToken(invalidToken)).rejects.toThrow(
        'Invalid refresh token',
      );
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify valid access token', async () => {
      const loginPayload: LoginUserPayload = {
        email: 'login@example.com',
        password: 'Password123!',
      };

      const result = await authService.login(loginPayload);
      const payload = authService.verifyAccessToken(result.accessToken);

      expect(payload.userId).toBe(result.user.id);
    });

    it('should throw error for invalid access token', () => {
      const invalidToken = 'invalid.jwt.token';

      expect(() => authService.verifyAccessToken(invalidToken)).toThrow(
        'Invalid or expired access token',
      );
    });
  });
});
