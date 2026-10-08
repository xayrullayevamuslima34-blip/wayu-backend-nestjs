# WAYU Backend

REST API for the WAYU organization website: news, events, an online library, donations and expenses, vacancies and job applications, FAQs and other content. It has a public API for the website and a protected API for administrators.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803)
![Jest](https://img.shields.io/badge/E2E_tests-21_suites-C21325?logo=jest&logoColor=white)

## Highlights

- **20+ resources** split into feature modules: news, events, library, finance, recruitment, organization, content, questions
- **Public / admin separation:** every resource has a read-only `public/*` controller and a protected `admin/*` controller
- **Roles:** `superAdmin` creates admins, admins manage content (JWT + custom `RolesGuard`)
- **CQRS** (`@nestjs/cqrs`) for auth commands and queries
- **Caching** with `@nestjs/cache-manager`
- **File uploads** with Multer
- **TypeORM migrations** instead of `synchronize`
- **21 E2E test suites** (Jest + Supertest) covering CRUD for every entity on an isolated test database
- **Swagger** docs with persisted bearer auth

## Project structure

```
src/
  config/         # TypeORM, JWT, Multer, Swagger configuration
  core/           # shared decorators, enums, filters, guards
  features/
    auth/         # super-admin and admin login (CQRS)
    common/       # countries, languages
    content/      # FAQs, static info, social links, useful links, Instagram posts
    events/       # events and event categories
    finance/      # donations and expenses
    library/      # books, authors, book categories
    news/         # news, news categories, tags
    organization/ # branches, representatives
    questions/    # user questions and moderation statuses
    recruitment/  # vacancies and applications
  migrations/
test/             # E2E tests, one suite per resource
```

## Getting started

Requirements: Node.js 20+, PostgreSQL 14+

```bash
npm install
cp .env.example .env    # fill in DB_URL and JWT_SECRET
npm run migrate         # build and run migrations
npm run start:dev
```

The API runs at `http://localhost:8888`. Swagger UI is at **http://localhost:8888/docs**.

## Tests

```bash
npm run test:e2e
```

Before every run, the global setup drops and recreates a `wayu_test` database, so tests never touch development data. Set `DEFAULT_DATABASE_URL` and `TEST_DATABASE_URL` in `.env` first.

## API overview

| Prefix | Access | Example |
|---|---|---|
| `/login/admin` | public | `POST /login/admin/login` |
| `/admin-creating` | super admin | create admin accounts |
| `/public/*` | public | `GET /public/news`, `GET /public/books` |
| `/admin/*` | admin (Bearer token) | `POST /admin/news`, `PATCH /admin/vacancies/:id` |

See Swagger for the full list of endpoints and request/response schemas.
