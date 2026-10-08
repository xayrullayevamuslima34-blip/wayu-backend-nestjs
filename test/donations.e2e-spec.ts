import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';


// ===============================Donations===============================

describe('Donations E2E test', () => {
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
  it('should create a donation', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/donations/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        amount: 100.50,
        fullName: 'John Doe',
        date: new Date().toISOString(),
        paidBy: 'Payme'
      })
      .expect(201);

  });

  ///------Read (list)
  it('should get all donations', async () => {
    await request(app.getHttpServer())
      .get('/admin/donations/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one donation by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/donations`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a donation', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/donations/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        amount: 200.00,
        fullName: 'John Updated Doe',
        date: new Date().toISOString(),
        paidBy: 'Click'
      })
      .expect(200);
  });

  ///-------Delete
  it('should delete a donation', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/donations/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all donations from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/donations/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one donation by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/donations`)
      .expect(200);
  });
});
