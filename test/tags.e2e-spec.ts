import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

// ===============================Tags===============================

describe('Tags E2E test', () => {
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
  it('should create a tag', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/tags')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Technology' })
      .expect(201);
  });

  ///------Read (list)
  it('should get all tags', async () => {
    await request(app.getHttpServer())
      .get('/admin/tags/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one tag by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/tags`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a tag', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/tags`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Modern Technology' })
      .expect(200);
  });

  ///-------Delete
  it('should delete a tag', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/tags`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all tags from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/tags/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one tag by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/tags`)
      .expect(200);
  });
});
