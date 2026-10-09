import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';

// ===============================Languages===============================

describe('Languages E2E test', () => {
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
  it('should create a language', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/languages/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Uzbek' })
      .expect(201);
  });

  ///------Read (list)
  it('should get all languages', async () => {
    await request(app.getHttpServer())
      .get('/admin/languages/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one language by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/languages`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a language', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/languages/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Uzbek Language' })
      .expect(200);
  });

  ///-------Delete
  it('should delete a language', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/languages/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all languages from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/languages/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one language by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/languages`)
      .expect(200);
  });
});
