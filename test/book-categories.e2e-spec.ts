import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

// ===============================BookCategories===============================

describe('BookCategories E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => {
    await teardownTestApp(app, dataSource);
  });

  ///---------Login
  it('should successfully login and get jwt token', async () => {
    const res = await request(app.getHttpServer())
      .post('/login/admin/login')
      .send({ login: 'admin@gmail.com', password: '12345' })
      .expect(201);

    expect(res.body.accessToken).toBeDefined();
    jwtToken = res.body.accessToken;
  });

  ///------Create
  it('should create a book category', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/book-categories/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Fiction' })
      .expect(201);
  });

  ///------Read (list)
  it('should get all book categories', async () => {
    await request(app.getHttpServer())
      .get('/admin/book-categories/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one book category by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/book-categories`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a book category', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/book-categories/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Science Fiction' })
      .expect(200);
  });

  ///-------Delete
  it('should delete a book category', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/book-categories/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all book categories from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/book-categories/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one book category by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/book-categories`)
      .expect(200);
  });
});
