import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';


describe('Countries E2E test', () => {
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
  it('should successfully perform CRUD operations on Country', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/countries/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Uzbekistan')
      .attach('flag', Buffer.from('dummy'), 'test.png')
      .expect(201);
  });

  ///------Read
  it('should get all countries', async () => {
    await request(app.getHttpServer())
      .get(`/admin/countries/list`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-one
  it('should get one country by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/countries`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a country', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/countries/update`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Uzbekistan republic')
      .attach('flag', Buffer.from('dummy'), 'test.png')
      .expect(200);
  });

  ///-------Delete
  it('should delete a country ', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/countries/delete`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public
  it('should get all countries from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/countries/list`)
      .expect(200);
  });

  ///------Read-one-public
  it('should get one country by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/countries`)
      .expect(200);
  });

});
