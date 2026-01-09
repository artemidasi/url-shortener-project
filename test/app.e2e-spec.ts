import * as request from 'supertest';

import { server } from './setup';

describe('AppController (e2e)', () => {
  // it('/ (GET)', async () => {
  //   await databaseService.user.create({
  //     data: {
  //       email: 'egor@example.com',
  //     },
  //   });

  //   const users = await databaseService.user.count();

  //   console.log(`1st TEST count: ${users}`);

  //   const environment = configService.get<string>('environment');

  //   console.log(`ENV: ${environment}`);

  //   return request(server)
  //     .get('/')
  //     .expect(200)
  //     .expect(
  //       ({
  //         body,
  //       }: {
  //         body: {
  //           data: string;
  //         };
  //       }) => {
  //         expect(body.data).toBe('asdasd');
  //       },
  //     );
  // });

  // it('/ (GET)', async () => {
  //   const users = await databaseService.user.count();

  //   console.log(`2nd TEST count: ${users}`);

  //   return request(server)
  //     .get('/')
  //     .expect(200)
  //     .expect(
  //       ({
  //         body,
  //       }: {
  //         body: {
  //           data: string;
  //         };
  //       }) => {
  //         expect(body.data).toBe('asdasd');
  //       },
  //     );
  // });

  it('/ (GET)', async () => {
    return request(server)
      .get('/')
      .expect(200)
      .expect(
        ({
          body,
        }: {
          body: {
            data: string;
          };
        }) => {
          expect(body.data).toBe('asdasd');
        },
      );
  });
});
