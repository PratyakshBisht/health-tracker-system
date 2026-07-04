export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = this.getTimestamp();
    const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataStr}`;
  }

  error(message: string, error?: unknown): void {
    console.error(this.formatMessage('error', message, error));
  }

  warn(message: string, data?: unknown): void {
    console.warn(this.formatMessage('warn', message, data));
  }

  info(message: string, data?: unknown): void {
    console.log(this.formatMessage('info', message, data));
  }

  debug(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.log(this.formatMessage('debug', message, data));
    }
  }
}

export const logger = new Logger();
