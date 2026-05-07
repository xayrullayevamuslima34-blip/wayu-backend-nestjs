import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

// ===============================Branches===============================

describe('Branches E2E test', () => {
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
  it('should create a branch', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/branches/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        countryId: '1',
        representativeId: '1',
        city: 'Tashkent',
        latitude: 41.2995,
        longitude: 69.2401,
        phoneNumber: '+998712345678'
      })
      .expect(201);
  });

  ///------Read (list)
  it('should get all branches', async () => {
    await request(app.getHttpServer())
      .get('/admin/branches/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one branch by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/branches`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a branch', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/branches/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        countryId: '1',
        representativeId: '1',
        city: 'Samarkand',
        latitude: 39.6542,
        longitude: 66.9597,
        phoneNumber: '+998662345678'
      })
      .expect(200);
  });

  ///-------Delete Branch
  it('should delete a branch', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/branches/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all branches from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/branches/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one branch by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/branches`)
      .expect(200);
  });
});
