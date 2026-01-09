import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Логиование
  app.useLogger(app.get(LoggerService));

  // Нужные заголовки ответа
  app.use(helmet());

  // Отвечает за проверку Dto
  app.useGlobalPipes(
    new ValidationPipe({
      // Будут грузится только те поля, которые прописаны в Dto
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
