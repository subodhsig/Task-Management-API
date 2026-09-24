import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //this is used to validate the incoming request data and transform it into the desired format. It also removes any properties that are not defined in the DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true, //this will remove any properties that are not defined in the DTO
      whitelist: true,
      //forbidNonWhitelisted: true, //this will throw an error if any properties that are not defined in the DTO are present in the request
      forbidNonWhitelisted: true,
      //transform: true, //this will transform the incoming request data into the desired format
      transform: true,
    }),
  );
  //this is used to handle all the exceptions thrown in the application and return a proper response to the client
  app.useGlobalFilters(new HttpExceptionFilter());

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
