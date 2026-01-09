import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import helmet from 'helmet';

let app: INestApplication<App>;
let server: App;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  // Нужные заголовки ответа
  app.use(helmet());

  // Отвечает за проверку Dto
  app.useGlobalPipes(
    new ValidationPipe({
      // Будут грузится только те поля, которые прописаны в Dto
      whitelist: true,
    }),
  );

  await app.init();

  server = app.getHttpServer();
});

afterEach(async () => {});

afterAll(async () => {
  await app.close();
});

export { server };
