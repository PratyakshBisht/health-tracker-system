import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import { logger } from './config/logger';
import { getPrismaClient, disconnectDatabase } from './infrastructure/database';
import { createAuthRoutes } from './presentation/routes/auth-routes';
import { errorHandler } from './middleware/error-handler';

const app = express();

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Initialize database connection
getPrismaClient();

// Routes
app.use('/api/auth', createAuthRoutes());

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = config.port;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`Environment: ${config.env}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
});
