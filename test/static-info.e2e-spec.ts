import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';


// ===============================StaticInfo===============================

describe('StaticInfo E2E test', () => {
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
  it('should create static info', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/static-info/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        aboutUs: 'This is about us description. Our company provides...',
        appStoreLink: 'https://apps.apple.com/app/example',
        playMarketLink: 'https://play.google.com/store/apps/details?id=com.example'
      })
      .expect(201);

  });

  ///------Read (list)
  it('should get all static info', async () => {
    await request(app.getHttpServer())
      .get('/admin/static-info/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one static info by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/static-info`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update static info', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/static-info/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        aboutUs: 'Updated about us description. New information here.',
        appStoreLink: 'https://apps.apple.com/app/updated-example',
        playMarketLink: 'https://play.google.com/store/apps/details?id=com.updated.example'
      })
      .expect(200);
  });

  ///-------Delete
  it('should delete static info', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/static-info/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all static info from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/static-info/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one static info by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/static-info`)
      .expect(200);
  });
});
