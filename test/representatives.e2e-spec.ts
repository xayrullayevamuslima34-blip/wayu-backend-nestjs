import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';


// ===============================Representatives===============================

describe('Representatives E2E test', () => {
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
  it('should create a representative', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/representatives/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('fullName', 'John Smith')
      .field('email', 'john.smith@example.com')
      .field('phoneNumber', '+998901234567')
      .field('resume', 'Experienced branch manager with 10+ years of experience')
      .attach('image', Buffer.from('dummy image content'), 'representative-image.png')
      .expect(201);
  });

  ///------Read (list)
  it('should get all representatives', async () => {
    await request(app.getHttpServer())
      .get('/admin/representatives/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one representative by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/representatives`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update a representative', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/representatives/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('fullName', 'John Updated Smith')
      .field('email', 'john.updated@example.com')
      .field('phoneNumber', '+998901234568')
      .field('resume', 'Updated experience: Senior branch manager')
      .attach('image', Buffer.from('updated image content'), 'updated-representative-image.png')
      .expect(200);
  });

  ///-------Delete
  it('should delete a representative', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/representatives/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all representatives from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/representatives/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one representative by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/representatives`)
      .expect(200);
  });
});
