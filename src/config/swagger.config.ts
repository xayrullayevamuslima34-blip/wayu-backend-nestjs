import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('WAYU API Endpoints')
    .setVersion('v1.0.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, doc, { swaggerOptions: { persistAuthorization: true } });
}
