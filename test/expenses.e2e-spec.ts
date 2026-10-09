import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';



// ===============================Expenses===============================

describe('Expenses E2E test', () => {
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
  it('should create an expense', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/expenses/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        amount: 150.75,
        date: new Date().toISOString(),
        title: 'Office Supplies',
        transactionId: 123456789,
        description: 'Purchased office stationery and equipment'
      })
      .expect(201);
  });

  ///------Read (list)
  it('should get all expenses', async () => {
    await request(app.getHttpServer())
      .get('/admin/expenses/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one expense by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/expenses`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update an expense', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/expenses/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        amount: 200.00,
        date: new Date().toISOString(),
        title: 'Updated Office Supplies',
        description: 'Updated description with new items',
        transactionId: 987654321
      })
      .expect(200);
  });

  ///-------Delete
  it('should delete an expense', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/expenses/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all expenses from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/expenses/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one expense by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/expenses`)
      .expect(200);
  });
});

