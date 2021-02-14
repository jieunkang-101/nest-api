import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Task API');
  });

  describe('/tasks', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/tasks').expect(200).expect([]);
    });
    it('POST 201', () => {
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
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send({
          taskId: 'abc-123-1',
          name: 'Learning NestJS',
          // completionDate: '2021-02-20', this property is required
          // categories: ['work', 'dev'], this property is optional
          test: 'non-whitelisted properties', // this property shouldn't be sent
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/tasks').expect(404);
    });
  });

  describe('/tasks/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/tasks/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/tasks/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/tasks/1')
        .send({ name: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/tasks/1').expect(200);
    });
  });
});
