import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be sources list examle.com', async () => {
    const result = await request(app.getHttpServer())
      .post('')
      .send({ url: 'examle.com' })
      .expect(200);
    expect(result.body.length).toBe(3);
  });

  it('should be valid error', async () => {
    const result = await request(app.getHttpServer()).post('').expect(400);
    expect(result.body).toEqual({
      statusCode: 400,
      message: ['url must be a string', 'url should not be empty'],
      error: 'Bad Request',
    });
  });
  it('should be sources list https://vk.com', async () => {
    const result = await request(app.getHttpServer())
      .post('')
      .send({ url: 'https://vk.com' })
      .expect(200);
    expect(result.body.length).not.toBe(0);
  });
  it('should be error https://vk.co', async () => {
    await request(app.getHttpServer())
      .post('')
      .send({ url: 'https://vk.co' })
      .expect(404);
  });
});
