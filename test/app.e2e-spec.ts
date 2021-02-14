import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Task API');
  });

  describe('/tasks', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/tasks').expect(200).expect([]);
    });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send({
          taskId: 'abc-123-1',
          name: 'Learning NestJS',
          completionDate: '2021-02-20',
          categories: ['work', 'dev'],
        })
        .expect(201);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/tasks').expect(404);
    });
  });

  describe('/tasks/:id', () => {
    it.todo('GET');
    it.todo('POST');
    it.todo('DELETE');
  });
});
