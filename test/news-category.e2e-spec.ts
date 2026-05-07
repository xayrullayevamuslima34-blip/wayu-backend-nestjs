import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';


// ===============================Countries===============================

describe('Countries E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdCountryId: number;

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

    createdCountryId = createRes.body.id;
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
      .get(`/admin/countries/${createdCountryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a country', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/countries/update/${createdCountryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Uzbekistan republic')
      .attach('flag', Buffer.from('dummy'), 'test.png')
      .expect(200);
  });

  ///-------Delete
  it('should delete a country ', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/countries/delete/${createdCountryId}`)
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
      .get(`/public/countries/${createdCountryId}`)
      .expect(200);
  });

});



// ===============================Languages===============================

describe('Languages E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdLanguageId: number;

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
  it('should create a language', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/languages/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Uzbek' })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdLanguageId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all languages', async () => {
    await request(app.getHttpServer())
      .get('/admin/languages/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one language by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/languages/${createdLanguageId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a language', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/languages/update/${createdLanguageId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Uzbek Language' })
      .expect(200);
  });

  ///-------Delete
  it('should delete a language', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/languages/delete/${createdLanguageId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all languages from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/languages/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one language by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/languages/${createdLanguageId}`)
      .expect(200);
  });
});


// ===============================Faqs===============================

describe('Faqs E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdFaqsId: number;
  let createdTagId: number;

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

  ///---------Create Tag for Faqs (before creating faq)
  it('should create a tag for testing faqs', async () => {
    const createTagRes = await request(app.getHttpServer())
      .post('/admin/tags/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Test Tag for Faqs' })
      .expect(201);

    expect(createTagRes.body.id).toBeDefined();
    createdTagId = createTagRes.body.id;
  });

  ///------Create Faqs
  it('should create a faq', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/faqs/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        question: 'What is NestJS?',
        answer: 'NestJS is a Node.js framework.',
        tagsId: createdTagId
      })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdFaqsId = createRes.body.id;
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
      .get(`/admin/faqs/${createdFaqsId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a faq', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/faqs/update/${createdFaqsId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        question: 'What is NestJS used for?',
        answer: 'NestJS is used for building server-side applications.',
        tagsId: createdTagId
      })
      .expect(200);
  });

  ///-------Delete Faqs
  it('should delete a faq', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/faqs/delete/${createdFaqsId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test Tag (cleanup)
  it('should delete the test tag', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/tags/delete/${createdTagId}`)
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
      .get(`/public/faqs/${createdFaqsId}`)
      .expect(200);
  });
});



// ===============================InstagramPosts===============================

describe('InstagramPosts E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdInstagramPostId: number;

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

  ///------Create (with file upload)
  it('should create an instagram post', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/instagram-posts/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('link', 'https://www.instagram.com/p/example123/')
      .attach('image', Buffer.from('dummy image content'), 'test-image.png')
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdInstagramPostId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all instagram posts', async () => {
    await request(app.getHttpServer())
      .get('/admin/instagram-posts/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one instagram post by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/instagram-posts/${createdInstagramPostId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update an instagram post', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/instagram-posts/update/${createdInstagramPostId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('link', 'https://www.instagram.com/p/updated123/')
      .attach('image', Buffer.from('updated image content'), 'updated-image.png')
      .expect(200);
  });

  ///-------Delete
  it('should delete an instagram post', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/instagram-posts/delete/${createdInstagramPostId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all instagram posts from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/instagram-posts/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one instagram post by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/instagram-posts/${createdInstagramPostId}`)
      .expect(200);
  });
});


// ===============================SocialLinks===============================

describe('SocialLinks E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdSocialLinkId: number;

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

  ///------Create (with file upload - icon)
  it('should create a social link', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/social-links/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Telegram')
      .field('link', 'https://t.me/example')
      .attach('icon', Buffer.from('dummy icon content'), 'telegram-icon.png')
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdSocialLinkId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all social links', async () => {
    await request(app.getHttpServer())
      .get('/admin/social-links/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one social link by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/social-links/${createdSocialLinkId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a social link', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/social-links/update/${createdSocialLinkId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Instagram')
      .field('link', 'https://www.instagram.com/example')
      .attach('icon', Buffer.from('updated icon content'), 'instagram-icon.png')
      .expect(200);
  });

  ///-------Delete
  it('should delete a social link', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/social-links/delete/${createdSocialLinkId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all social links from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/social-links/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one social link by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/social-links/${createdSocialLinkId}`)
      .expect(200);
  });
});


// ===============================StaticInfo===============================

describe('StaticInfo E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdStaticInfoId: number;

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
  it('should create static info', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/static-info/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        aboutUs: 'This is about us description. Our company provides...',
        appStoreLink: 'https://apps.apple.com/app/example',
        playMarketLink: 'https://play.google.com/store/apps/details?id=com.example'
      })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdStaticInfoId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all static info', async () => {
    await request(app.getHttpServer())
      .get('/admin/static-info/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one static info by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/static-info/${createdStaticInfoId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update static info', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/static-info/update/${createdStaticInfoId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        aboutUs: 'Updated about us description. New information here.',
        appStoreLink: 'https://apps.apple.com/app/updated-example',
        playMarketLink: 'https://play.google.com/store/apps/details?id=com.updated.example'
      })
      .expect(200);
  });

  ///-------Delete
  it('should delete static info', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/static-info/delete/${createdStaticInfoId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all static info from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/static-info/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one static info by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/static-info/${createdStaticInfoId}`)
      .expect(200);
  });
});


// ===============================UsefulLinks===============================

describe('UsefulLinks E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdUsefulLinkId: number;

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

  ///------Create (with file upload - icon)
  it('should create a useful link', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/useful-links/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Google')
      .field('link', 'https://www.google.com')
      .attach('icon', Buffer.from('dummy icon content'), 'google-icon.png')
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdUsefulLinkId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all useful links', async () => {
    await request(app.getHttpServer())
      .get('/admin/useful-links/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one useful link by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/useful-links/${createdUsefulLinkId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update a useful link', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/useful-links/update/${createdUsefulLinkId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'YouTube')
      .field('link', 'https://www.youtube.com')
      .attach('icon', Buffer.from('updated icon content'), 'youtube-icon.png')
      .expect(200);
  });

  ///-------Delete
  it('should delete a useful link', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/useful-links/delete/${createdUsefulLinkId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all useful links from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/useful-links/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one useful link by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/useful-links/${createdUsefulLinkId}`)
      .expect(200);
  });
});


// ===============================EventCategories===============================

describe('EventCategories E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdEventCategoryId: number;

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
  it('should create an event category', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/event-categories/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Conference' })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdEventCategoryId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all event categories', async () => {
    await request(app.getHttpServer())
      .get('/admin/event-categories/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one event category by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/event-categories/${createdEventCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update an event category', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/event-categories/update/${createdEventCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Business Conference' })
      .expect(200);
  });

  ///-------Delete
  it('should delete an event category', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/event-categories/delete/${createdEventCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all event categories from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/event-categories/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one event category by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/event-categories/${createdEventCategoryId}`)
      .expect(200);
  });
});



// ===============================Events===============================

describe('Events E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdEventId: number;
  let testEventCategoryId: number;

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

  ///---------Create Event Category for Event (before creating event)
  it('should create an event category for testing events', async () => {
    const createCategoryRes = await request(app.getHttpServer())
      .post('/admin/event-categories/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Test Event Category' })
      .expect(201);

    expect(createCategoryRes.body.id).toBeDefined();
    testEventCategoryId = createCategoryRes.body.id;
  });

  ///------Create (with file upload - image)
  it('should create an event', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/events/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', testEventCategoryId)
      .field('title', 'Tech Conference 2024')
      .field('content', 'A great tech conference with many speakers')
      .field('date', new Date().toISOString())
      .field('address', 'Business Center, Tashkent')
      .attach('image', Buffer.from('dummy image content'), 'event-image.png')
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdEventId = createRes.body.id;
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
      .get(`/admin/events/${createdEventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update an event', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/events/update/${createdEventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', testEventCategoryId)
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
      .delete(`/admin/events/delete/${createdEventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test Event Category (cleanup)
  it('should delete the test event category', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/event-categories/delete/${testEventCategoryId}`)
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
      .get(`/public/events/${createdEventId}`)
      .expect(200);
  });
});


// ===============================Donations===============================

describe('Donations E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdDonationId: number;

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

    expect(createRes.body.id).toBeDefined();
    createdDonationId = createRes.body.id;
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
      .get(`/admin/donations/${createdDonationId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a donation', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/donations/update/${createdDonationId}`)
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
      .delete(`/admin/donations/delete/${createdDonationId}`)
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
      .get(`/public/donations/${createdDonationId}`)
      .expect(200);
  });
});


// ===============================Expenses===============================

describe('Expenses E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdExpenseId: number;

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

    expect(createRes.body.id).toBeDefined();
    createdExpenseId = createRes.body.id;
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
      .get(`/admin/expenses/${createdExpenseId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update an expense', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/expenses/update/${createdExpenseId}`)
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
      .delete(`/admin/expenses/delete/${createdExpenseId}`)
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
      .get(`/public/expenses/${createdExpenseId}`)
      .expect(200);
  });
});


// ===============================Authors===============================

describe('Authors E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdAuthorId: number;

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
  it('should create an author', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/authors/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ fullName: 'John Doe' })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdAuthorId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all authors', async () => {
    await request(app.getHttpServer())
      .get('/admin/authors/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one author by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/authors/${createdAuthorId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update an author', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/authors/update/${createdAuthorId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ fullName: 'John Updated Doe' })
      .expect(200);
  });

  ///-------Delete
  it('should delete an author', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/authors/delete/${createdAuthorId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all authors from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/authors/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one author by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/authors/${createdAuthorId}`)
      .expect(200);
  });
});


// ===============================BookCategories===============================

describe('BookCategories E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdBookCategoryId: number;

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
  it('should create a book category', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/book-categories/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Fiction' })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdBookCategoryId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all book categories', async () => {
    await request(app.getHttpServer())
      .get('/admin/book-categories/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one book category by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/book-categories/${createdBookCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a book category', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/book-categories/update/${createdBookCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Science Fiction' })
      .expect(200);
  });

  ///-------Delete
  it('should delete a book category', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/book-categories/delete/${createdBookCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all book categories from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/book-categories/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one book category by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/book-categories/${createdBookCategoryId}`)
      .expect(200);
  });
});


// ===============================Books===============================

describe('Books E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdBookId: number;
  let testAuthorId: number;
  let testBookCategoryId: number;

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

  ///---------Create Author for Book
  it('should create an author for testing books', async () => {
    const createAuthorRes = await request(app.getHttpServer())
      .post('/admin/authors/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ fullName: 'Test Author' })
      .expect(201);

    expect(createAuthorRes.body.id).toBeDefined();
    testAuthorId = createAuthorRes.body.id;
  });

  ///---------Create Book Category for Book
  it('should create a book category for testing books', async () => {
    const createCategoryRes = await request(app.getHttpServer())
      .post('/admin/book-categories/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Test Category' })
      .expect(201);

    expect(createCategoryRes.body.id).toBeDefined();
    testBookCategoryId = createCategoryRes.body.id;
  });

  ///------Create (with multiple file uploads - image and file)
  it('should create a book', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/books/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('authorId', testAuthorId)
      .field('categoryId', testBookCategoryId)
      .field('title', 'The Great Book')
      .field('pages', '350')
      .field('year', '2024')
      .field('description', 'This is a great book description')
      .attach('image', Buffer.from('dummy image content'), 'book-cover.png')
      .attach('file', Buffer.from('dummy pdf content'), 'book.pdf')
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdBookId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all books', async () => {
    await request(app.getHttpServer())
      .get('/admin/books/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one book by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/books/${createdBookId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with multiple file uploads)
  it('should update a book', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/books/update/${createdBookId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('authorId', testAuthorId)
      .field('categoryId', testBookCategoryId)
      .field('title', 'The Updated Great Book')
      .field('pages', '400')
      .field('year', '2025')
      .field('description', 'This is an updated book description')
      .attach('image', Buffer.from('updated image content'), 'updated-cover.png')
      .attach('file', Buffer.from('updated pdf content'), 'updated-book.pdf')
      .expect(200);
  });

  ///-------Delete Book
  it('should delete a book', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/books/delete/${createdBookId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test Author (cleanup)
  it('should delete the test author', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/authors/delete/${testAuthorId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test Book Category (cleanup)
  it('should delete the test book category', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/book-categories/delete/${testBookCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all books from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/books/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one book by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/books/${createdBookId}`)
      .expect(200);
  });
});

// ===============================News===============================

describe('News E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdNewsId: number;
  let testCategoryId: number;
  let testCountryId: number;
  let testTagId: number;

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

  ///---------Create News Category for News
  it('should create a news category for testing news', async () => {
    const createCategoryRes = await request(app.getHttpServer())
      .post('/admin/news-categories/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Test News Category' })
      .expect(201);

    expect(createCategoryRes.body.id).toBeDefined();
    testCategoryId = createCategoryRes.body.id;
  });

  ///---------Create Country for News
  it('should create a country for testing news', async () => {
    const createCountryRes = await request(app.getHttpServer())
      .post('/admin/countries/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Test Country')
      .attach('flag', Buffer.from('dummy'), 'test-flag.png')
      .expect(201);

    expect(createCountryRes.body.id).toBeDefined();
    testCountryId = createCountryRes.body.id;
  });

  ///---------Create Tag for News
  it('should create a tag for testing news', async () => {
    const createTagRes = await request(app.getHttpServer())
      .post('/admin/tags/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Test Tag' })
      .expect(201);

    expect(createTagRes.body.id).toBeDefined();
    testTagId = createTagRes.body.id;
  });

  ///------Create (with file upload - image)
  it('should create a news', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/news/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', testCategoryId)
      .field('title', 'Breaking News')
      .field('date', new Date().toISOString().split('T')[0]) // YYYY-MM-DD format
      .field('content', 'This is the news content with important information')
      .field('countryId', testCountryId)
      .field('tagIds', JSON.stringify([testTagId]))
      .attach('image', Buffer.from('dummy image content'), 'news-image.png')
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdNewsId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all news', async () => {
    await request(app.getHttpServer())
      .get('/admin/news/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one news by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/news/${createdNewsId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update a news', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/news/update/${createdNewsId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', testCategoryId)
      .field('title', 'Updated Breaking News')
      .field('date', new Date().toISOString().split('T')[0])
      .field('content', 'This is the updated news content')
      .field('countryId', testCountryId)
      .field('tagIds', JSON.stringify([testTagId]))
      .attach('image', Buffer.from('updated image content'), 'updated-news-image.png')
      .expect(200);
  });

  ///-------Delete News
  it('should delete a news', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/news/delete/${createdNewsId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test Tag (cleanup)
  it('should delete the test tag', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/tags/delete/${testTagId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test Country (cleanup)
  it('should delete the test country', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/countries/delete/${testCountryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test News Category (cleanup)
  it('should delete the test news category', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/news-categories/delete/${testCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all news from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/news/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one news by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/news/${createdNewsId}`)
      .expect(200);
  });
});


// ===============================NewsCategories===============================

describe('NewsCategories E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdNewsCategoryId: number;

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
  it('should create a news category', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/news-category')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Politics' })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdNewsCategoryId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all news categories', async () => {
    await request(app.getHttpServer())
      .get('/admin/news-category/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one news category by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/news-category/${createdNewsCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a news category', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/news-category/${createdNewsCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'International Politics' })
      .expect(200);
  });

  ///-------Delete
  it('should delete a news category', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/news-category/${createdNewsCategoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all news categories from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/news-category/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one news category by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/news-category/${createdNewsCategoryId}`)
      .expect(200);
  });
});


// ===============================Tags===============================

describe('Tags E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdTagId: number;

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
  it('should create a tag', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/tags')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Technology' })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdTagId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all tags', async () => {
    await request(app.getHttpServer())
      .get('/admin/tags/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one tag by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/tags/${createdTagId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a tag', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/tags/${createdTagId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Modern Technology' })
      .expect(200);
  });

  ///-------Delete
  it('should delete a tag', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/tags/${createdTagId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all tags from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/tags/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one tag by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/tags/${createdTagId}`)
      .expect(200);
  });
});


// ===============================Branches===============================

describe('Branches E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdBranchId: number;
  let testCountryId: number;
  let testRepresentativeId: number;

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

  ///---------Create Country for Branch
  it('should create a country for testing branch', async () => {
    const createCountryRes = await request(app.getHttpServer())
      .post('/admin/countries/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Test Country for Branch')
      .attach('flag', Buffer.from('dummy'), 'test-flag.png')
      .expect(201);

    expect(createCountryRes.body.id).toBeDefined();
    testCountryId = createCountryRes.body.id;
  });

  ///---------Create Representative for Branch
  it('should create a representative for testing branch', async () => {
    const createRepRes = await request(app.getHttpServer())
      .post('/admin/representatives/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        fullName: 'John Doe',
        position: 'Branch Manager',
        phoneNumber: '+998901234567'
      })
      .expect(201);

    expect(createRepRes.body.id).toBeDefined();
    testRepresentativeId = createRepRes.body.id;
  });

  ///------Create
  it('should create a branch', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/admin/branches/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        countryId: testCountryId,
        representativeId: testRepresentativeId,
        city: 'Tashkent',
        latitude: 41.2995,
        longitude: 69.2401,
        phoneNumber: '+998712345678'
      })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdBranchId = createRes.body.id;
  });

  ///------Read (list)
  it('should get all branches', async () => {
    await request(app.getHttpServer())
      .get('/admin/branches/list')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read (one)
  it('should get one branch by id', async () => {
    await request(app.getHttpServer())
      .get(`/admin/branches/${createdBranchId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a branch', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/branches/update/${createdBranchId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        countryId: testCountryId,
        representativeId: testRepresentativeId,
        city: 'Samarkand',
        latitude: 39.6542,
        longitude: 66.9597,
        phoneNumber: '+998662345678'
      })
      .expect(200);
  });

  ///-------Delete Branch
  it('should delete a branch', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/branches/delete/${createdBranchId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test Representative (cleanup)
  it('should delete the test representative', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/representatives/delete/${testRepresentativeId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test Country (cleanup)
  it('should delete the test country', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/countries/delete/${testCountryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Read-public (list)
  it('should get all branches from public endpoint', async () => {
    await request(app.getHttpServer())
      .get('/public/branches/list')
      .expect(200);
  });

  ///------Read-one-public
  it('should get one branch by id from public endpoint', async () => {
    await request(app.getHttpServer())
      .get(`/public/branches/${createdBranchId}`)
      .expect(200);
  });
});


// ===============================Representatives===============================

describe('Representatives E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdRepresentativeId: number;

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

    expect(createRes.body.id).toBeDefined();
    createdRepresentativeId = createRes.body.id;
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
      .get(`/admin/representatives/${createdRepresentativeId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update (with file upload)
  it('should update a representative', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/representatives/update/${createdRepresentativeId}`)
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
      .delete(`/admin/representatives/delete/${createdRepresentativeId}`)
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
      .get(`/public/representatives/${createdRepresentativeId}`)
      .expect(200);
  });
});


// ===============================Questions===============================

describe('Questions E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdQuestionId: number;

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

    expect(createRes.body.id).toBeDefined();
    createdQuestionId = createRes.body.id;
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
      .get(`/admin/questions/${createdQuestionId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update a question', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/questions/update/${createdQuestionId}`)
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
      .delete(`/admin/questions/delete/${createdQuestionId}`)
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
      .get(`/public/questions/${createdQuestionId}`)
      .expect(200);
  });
});


// ===============================Applications===============================

describe('Applications E2E test', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdApplicationId: number;
  let testVacancyId: number;

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

  ///---------Create Vacancy for Application
  it('should create a vacancy for testing application', async () => {
    const createVacancyRes = await request(app.getHttpServer())
      .post('/admin/vacancies/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'Software Developer',
        description: 'Looking for experienced developer',
        salary: 2000
      })
      .expect(201);

    expect(createVacancyRes.body.id).toBeDefined();
    testVacancyId = createVacancyRes.body.id;
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
        vacancyId: testVacancyId,
        resume: 'https://example.com/resume/john-doe.pdf',
        status: 'active'
      })
      .expect(201);

    expect(createRes.body.id).toBeDefined();
    createdApplicationId = createRes.body.id;
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
      .get(`/admin/applications/${createdApplicationId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///------Update
  it('should update an application', async () => {
    await request(app.getHttpServer())
      .patch(`/admin/applications/update/${createdApplicationId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        fullName: 'John Updated Doe',
        phoneNumber: '+998901234568',
        email: 'john.updated@example.com',
        vacancyId: testVacancyId,
        resume: 'https://example.com/resume/john-updated-doe.pdf',
        status: 'reviewed'
      })
      .expect(200);
  });

  ///-------Delete Application
  it('should delete an application', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/applications/delete/${createdApplicationId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  ///-------Delete Test Vacancy (cleanup)
  it('should delete the test vacancy', async () => {
    await request(app.getHttpServer())
      .delete(`/admin/vacancies/delete/${testVacancyId}`)
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
      .get(`/public/applications/${createdApplicationId}`)
      .expect(200);
  });
});


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
      .send({ login: 'admin@gmail.com', password: '12345' })
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


