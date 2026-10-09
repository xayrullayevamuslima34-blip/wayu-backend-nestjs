import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';


// ===============================NewsCategories===============================

describe('NewsCategories E2E test', () => {
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
      .send({ login: 'admin@gmail.com', password: 'admin-password-123' })
      .expect(201);

    expect(res.body.accessToken).toBeDefined();
    jwtToken = res.body.accessToken;
  });

  ///------Create
  it('should create a news category', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/news-category')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Politics' })
      .expect(201);
  });

  ///------Read (list)
  it('should get all news categories', async () => {
    await request(app.getHttpServer())
      .get('/admin/news-category/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one news category by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/news-category`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a news category', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/news-category`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'International Politics' })
      .expect(200);
  });

  ///-------Delete
  it('should delete a news category', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/news-category`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all news categories from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/news-category/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one news category by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/news-category`)
      .expect(200);
  });
});
