import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { DataSource } from 'typeorm';
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
// @ts-ignore
import { TEST_ADMIN, TEST_SUPER_ADMIN } from './utils/test-users';

describe('Auth E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  const login = async (credentials: { login: string; password: string }) => {
    const res = await request(app.getHttpServer())
      .post('/login/admin/login')
      .send(credentials)
      .expect(201);
    return res.body.accessToken as string;
  };

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => {
    await teardownTestApp(app, dataSource);
  });

  it('logs in an admin without a token', async () => {
    const token = await login(TEST_ADMIN);
    expect(token).toBeDefined();
  });

  it('rejects a wrong password with 401', async () => {
    await request(app.getHttpServer())
      .post('/login/admin/login')
      .send({ login: TEST_ADMIN.login, password: 'wrong-password' })
      .expect(401);
  });

  it('returns 401 for an admin endpoint without a token', async () => {
    await request(app.getHttpServer()).get('/admin/tags/list').expect(401);
  });

  it('returns 401 for an admin endpoint with an invalid token', async () => {
    await request(app.getHttpServer())
      .get('/admin/tags/list')
      .set('Authorization', 'Bearer not-a-real-token')
      .expect(401);
  });

  it('allows an admin endpoint with a valid admin token', async () => {
    const token = await login(TEST_ADMIN);
    await request(app.getHttpServer())
      .get('/admin/tags/list')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('keeps public endpoints open without a token', async () => {
    await request(app.getHttpServer()).get('/public/tags/list').expect(200);
  });

  it('returns 401 for admin management without a token', async () => {
    await request(app.getHttpServer()).get('/admin-creating/list').expect(401);
  });

  it('returns 403 for admin management with a regular admin token', async () => {
    const token = await login(TEST_ADMIN);
    await request(app.getHttpServer())
      .get('/admin-creating/list')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });

  it('allows admin management for a super admin', async () => {
    const token = await login(TEST_SUPER_ADMIN);
    await request(app.getHttpServer())
      .get('/admin-creating/list')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // Keep this test last: it uses up the login rate limit for this app instance.
  it('returns 429 after too many login attempts', async () => {
    const LOGIN_LIMIT_PER_MINUTE = 10;
    let lastStatus = 0;
    for (let attempt = 0; attempt <= LOGIN_LIMIT_PER_MINUTE; attempt++) {
      const res = await request(app.getHttpServer())
        .post('/login/admin/login')
        .send({ login: TEST_ADMIN.login, password: 'wrong-password' });
      lastStatus = res.status;
    }
    expect(lastStatus).toBe(429);
  });
});
