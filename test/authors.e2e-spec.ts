import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

// ===============================Authors===============================

describe('Authors E2E test', () => {
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
  it('should create an author', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/authors/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ fullName: 'John Doe' })
      .expect(201);
  });

  ///------Read (list)
  it('should get all authors', async () => {
    await request(app.getHttpServer())
      .get('/admin/authors/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one author by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/authors`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update an author', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/authors/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ fullName: 'John Updated Doe' })
      .expect(200);
  });

  ///-------Delete
  it('should delete an author', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/authors/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all authors from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/authors/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one author by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/authors`)
      .expect(200);
  });
});
