import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('REST API for managing tasks')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app as any, config);

  SwaggerModule.setup('api/docs', app as any, document);

  await app.listen(process.env.PORT ?? 3000);

  //swagger link http://localhost:3000/api/docs
}

bootstrap();
