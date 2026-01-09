import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const isDevelopment =
      this.configService.getOrThrow('environment') === 'development';

    const { combine, timestamp, json, colorize, printf } = winston.format;

    const logFormat = isDevelopment
      ? combine(
          colorize(),
          timestamp(),
          printf(
            ({ timestamp, level, context, message, meta }) =>
              `${timestamp} ${level} [${context}] ${message} ${meta ? JSON.stringify(meta) : ''}`,
          ),
        )
      : combine(timestamp(), json());

    this.logger = winston.createLogger({
      format: logFormat,

      transports: [new winston.transports.Console()],
    });
  }

  error(message: string, trace?: string, context?: string, meta?: any) {
    this.logger.error(message, {
      trace,
      context,
      meta,
    });
  }

  log(message: string, context?: string, meta?: any) {
    this.logger.info(message, { context, meta });
  }

  warn(message: string, context?: string, meta?: any) {
    this.logger.warn(message, { context, meta });
  }
}
