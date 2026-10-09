import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

// ===============================News===============================

describe('News E2E test', () => {
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

  ///------Create (with file upload - image)
  it('should create a news', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/news/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', '1')
      .field('title', 'Breaking News')
      .field('date', new Date().toISOString().split('T')[0]) // YYYY-MM-DD format
      .field('content', 'This is the news content with important information')
      .field('countryId', '1')
      .field('tagIds', JSON.stringify(['1']))
      .attach('image', Buffer.from('dummy image content'), 'news-image.png')
      .expect(201);
  });

  ///------Read (list)
  it('should get all news', async () => {
    await request(app.getHttpServer())
      .get('/admin/news/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one news by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/news`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update a news', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/news/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', '1')
      .field('title', 'Updated Breaking News')
      .field('date', new Date().toISOString().split('T')[0])
      .field('content', 'This is the updated news content')
      .field('countryId', '1')
      .field('tagIds', JSON.stringify(['1']))
      .attach('image', Buffer.from('updated image content'), 'updated-news-image.png')
      .expect(200);
  });

  ///-------Delete News
  it('should delete a news', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/news/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all news from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/news/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one news by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/news`)
      .expect(200);
  });
});
