import { PrismaClient } from '@prisma/client';
import { logger } from '../config/logger';

let prisma: PrismaClient;

export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();

    prisma.$connect()
      .then(() => {
        logger.info('✅ Database connected successfully');
      })
      .catch((error) => {
        logger.error('❌ Failed to connect to database', error);
        process.exit(1);
      });
  }

  return prisma;
}

export async function disconnectDatabase(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
    logger.info('Database disconnected');
  }
}
