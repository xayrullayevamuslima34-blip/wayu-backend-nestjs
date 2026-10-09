import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';


// ===============================Faqs===============================

describe('Faqs E2E test', () => {
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

  ///------Create Faqs
  it('should create a faq', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/faqs/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        question: 'What is NestJS?',
        answer: 'NestJS is a Node.js framework.',
      })
      .expect(201);

  });

  ///------Read (list)
  it('should get all faqs', async () => {
    await request(app.getHttpServer())
      .get('/admin/faqs/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one faq by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/faqs`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a faq', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/faqs/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        question: 'What is NestJS used for?',
        answer: 'NestJS is used for building server-side applications.',
      })
      .expect(200);
  });

  ///-------Delete Faqs
  it('should delete a faq', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/faqs/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });


  ///------Read-public (list)
  it('should get all faqs from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/faqs/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one faq by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/faqs`)
      .expect(200);
  });
});
