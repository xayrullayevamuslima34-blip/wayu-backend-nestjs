import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

// ===============================Events===============================

describe('Events E2E test', () => {
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


  ///------Create (with file upload - image)
  it('should create an event', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/events/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', '1')
      .field('title', 'Tech Conference 2024')
      .field('content', 'A great tech conference with many speakers')
      .field('date', new Date().toISOString())
      .field('address', 'Business Center, Tashkent')
      .attach('image', Buffer.from('dummy image content'), 'event-image.png')
      .expect(201);

  });

  ///------Read (list)
  it('should get all events', async () => {
    await request(app.getHttpServer())
      .get('/admin/events/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one event by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/events`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update an event', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/events/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', '1')
      .field('title', 'Updated Tech Conference 2025')
      .field('content', 'Updated content with new information')
      .field('date', new Date().toISOString())
      .field('address', 'New Business Center, Tashkent')
      .attach('image', Buffer.from('updated image content'), 'updated-event-image.png')
      .expect(200);
  });

  ///-------Delete Event
  it('should delete an event', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/events/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all events from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/events/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one event by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/events`)
      .expect(200);
  });
});
