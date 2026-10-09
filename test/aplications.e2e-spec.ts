import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';


// ===============================Applications===============================

describe('Applications E2E test', () => {
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
  it('should create an application', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/applications/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        fullName: 'John Doe',
        phoneNumber: '+998901234567',
        email: 'john.doe@example.com',
        vacancyId: '1',
        resume: 'https://example.com/resume/john-doe.pdf',
        status: 'active'
      })
      .expect(201);
  });

  ///------Read (list)
  it('should get all applications', async () => {
    await request(app.getHttpServer())
      .get('/admin/applications/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one application by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/applications`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update an application', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/applications/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        fullName: 'John Updated Doe',
        phoneNumber: '+998901234568',
        email: 'john.updated@example.com',
        vacancyId: '1',
        resume: 'https://example.com/resume/john-updated-doe.pdf',
        status: 'reviewed'
      })
      .expect(200);
  });

  ///-------Delete Application
  it('should delete an application', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/applications/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all applications from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/applications/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one application by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/applications`)
      .expect(200);
  });
});

