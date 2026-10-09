import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';


// ===============================Vacancies===============================

describe('Vacancies E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdVacancyId: number;

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
  it('should create a vacancy', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/vacancies/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'Senior Software Developer',
        address: 'Tashkent, Uzbekistan',
        description: 'We are looking for an experienced software developer...',
        phoneNumber: '+998712345678',
        type: 'Full-time',
        salary: '$2000-3000',
        isActive: true
      })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdVacancyId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all vacancies', async () => {
    await request(app.getHttpServer())
      .get('/admin/vacancies/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one vacancy by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/vacancies/${createdVacancyId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a vacancy', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/vacancies/update/${createdVacancyId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'Lead Software Developer',
        address: 'Tashkent, Uzbekistan (Remote)',
        description: 'We are looking for a lead developer...',
        phoneNumber: '+998712345679',
        type: 'Remote',
        salary: '$3000-4000',
        isActive: true
      })
      .expect(200);
  });

  ///-------Delete
  it('should delete a vacancy', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/vacancies/delete/${createdVacancyId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all vacancies from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/vacancies/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one vacancy by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/vacancies/${createdVacancyId}`)
      .expect(200);
  });
});


