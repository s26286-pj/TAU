import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { initializeDatabase } from '../test-utils/db-utils';
import { DataSource } from 'typeorm';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    dataSource = moduleFixture.get<DataSource>(DataSource);
    await initializeDatabase(dataSource);
  });

  afterEach(async () => {
    await dataSource.destroy();
    await app.close();
  });

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /users/:id', () => {
    it('should return data for an existing user', async () => {
      const userId = 1;
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);
      expect(response.body).toHaveProperty('id', userId);
    });

    it('should return 404 for a non-existing user', async () => {
      const nonExistentId = 10000;
      await request(app.getHttpServer())
        .get(`/users/${nonExistentId}`)
        .expect(404);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = { name: 'Włodzimierz Cimoszewicz', email: 'wc@nbp.pl' };
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toMatchObject(newUser);
    });

    it('should return 400 for incomplete input data', async () => {
      const invalidUser = {};
      await request(app.getHttpServer())
        .post('/users')
        .send(invalidUser)
        .expect(400);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
      const userId = 1;
      const updatedData = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const response = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject(updatedData);

      const verifyResponse = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);
      expect(verifyResponse.body).toMatchObject(updatedData);
    });

    it('should return 404 for a non-existing user', async () => {
      const nonExistentId = 1000;
      const updatedData = { name: 'Updated Name', email: 'email@example.com' };
      await request(app.getHttpServer())
        .put(`/users/${nonExistentId}`)
        .send(updatedData)
        .expect(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
      const userId = 1;

      await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);
      await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
    });

    it('should return 404 for deleting a non-existing user', async () => {
      const nonExistentId = 1000;
      await request(app.getHttpServer())
        .delete(`/users/${nonExistentId}`)
        .expect(404);
    });
  });
});
