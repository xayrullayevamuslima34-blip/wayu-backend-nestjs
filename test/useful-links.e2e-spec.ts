import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';


// ===============================UsefulLinks===============================

describe('UsefulLinks E2E test', () => {
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

  ///------Create (with file upload - icon)
  it('should create a useful link', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/useful-links/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Google')
      .field('link', 'https://www.google.com')
      .attach('icon', Buffer.from('dummy icon content'), 'google-icon.png')
      .expect(201);

  });

  ///------Read (list)
  it('should get all useful links', async () => {
    await request(app.getHttpServer())
      .get('/admin/useful-links/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one useful link by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/useful-links`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update a useful link', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/useful-links/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'YouTube')
      .field('link', 'https://www.youtube.com')
      .attach('icon', Buffer.from('updated icon content'), 'youtube-icon.png')
      .expect(200);
  });

  ///-------Delete
  it('should delete a useful link', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/useful-links/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all useful links from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/useful-links/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one useful link by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/useful-links`)
      .expect(200);
  });
});
