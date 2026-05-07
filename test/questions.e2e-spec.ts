import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';


// ===============================Questions===============================

describe('Questions E2E test', () => {
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
  it('should create a question', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/questions/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        fullName: 'John Doe',
        phoneNumber: '+998901234567',
        question: 'What are your working hours?',
        status: 'Yangi'
      })
      .expect(201);
  });

  ///------Read (list)
  it('should get all questions', async () => {
    await request(app.getHttpServer())
      .get('/admin/questions/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one question by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/questions`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a question', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/questions/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        fullName: 'John Updated Doe',
        phoneNumber: '+998901234568',
        question: 'What are your working hours on weekends?',
        status: 'Javob berilgan'
      })
      .expect(200);
  });

  ///-------Delete
  it('should delete a question', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/questions/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all questions from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/questions/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one question by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/questions`)
      .expect(200);
  });
});
