import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

// ===============================SocialLinks===============================

describe('SocialLinks E2E test', () => {
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

  ///------Create (with file upload - icon)
  it('should create a social link', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/social-links/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Telegram')
      .field('link', 'https://t.me/example')
      .attach('icon', Buffer.from('dummy icon content'), 'telegram-icon.png')
      .expect(201);
  });

  ///------Read (list)
  it('should get all social links', async () => {
    await request(app.getHttpServer())
      .get('/admin/social-links/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one social link by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/social-links`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a social link', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/social-links/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Instagram')
      .field('link', 'https://www.instagram.com/example')
      .attach('icon', Buffer.from('updated icon content'), 'instagram-icon.png')
      .expect(200);
  });

  ///-------Delete
  it('should delete a social link', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/social-links/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all social links from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/social-links/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one social link by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/social-links`)
      .expect(200);
  });
});
