import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

// ===============================InstagramPosts===============================

describe('InstagramPosts E2E test', () => {
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

  ///------Create (with file upload)
  it('should create an instagram post', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/instagram-posts/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('link', 'https://www.instagram.com/p/example123/')
      .attach('image', Buffer.from('dummy image content'), 'test-image.png')
      .expect(201);

  });

  ///------Read (list)
  it('should get all instagram posts', async () => {
    await request(app.getHttpServer())
      .get('/admin/instagram-posts/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one instagram post by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/instagram-posts`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update an instagram post', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/instagram-posts/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('link', 'https://www.instagram.com/p/updated123/')
      .attach('image', Buffer.from('updated image content'), 'updated-image.png')
      .expect(200);
  });

  ///-------Delete
  it('should delete an instagram post', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/instagram-posts/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all instagram posts from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/instagram-posts/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one instagram post by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/instagram-posts`)
      .expect(200);
  });
});
