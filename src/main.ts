import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { configureSwagger } from './config/swagger.config';
import { validateEnv } from './config/validate-env';
import { ValidationPipe } from '@nestjs/common';

const DEFAULT_PORT = 8888;

async function bootstrap() {
  validateEnv();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Behind Render's proxy: use the client IP from X-Forwarded-For for rate limiting.
  app.set('trust proxy', 1);
  // CSP is disabled because Swagger UI relies on inline scripts and styles.
  app.use(helmet({ contentSecurityPolicy: false }));
  configureSwagger(app);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  const port = Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(port, () => console.log(`Server is up and running on port ${port}`));
}

bootstrap();
