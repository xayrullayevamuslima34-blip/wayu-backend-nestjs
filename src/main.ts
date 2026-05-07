import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from '@/core/guards/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureSwagger(app);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(8888, () => console.log('Server is up and running'));
}

bootstrap();
