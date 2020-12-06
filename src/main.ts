import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from '../config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  const docOpts = new DocumentBuilder()
    .setTitle(config.TITLE)
    .setDescription(config.DESCRIPTION)
    .setVersion(config.VERSION)
    .setBasePath(`/${config.PREFIX}`)
    .build();
  const doc = SwaggerModule.createDocument(app, docOpts);

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      validationError: { target: true },
      transform: true,
    }),
  );
  app.setGlobalPrefix(`${config.PREFIX}${config.API_EXPLORER_PATH}`);
  app.enableCors({
    credentials: true,
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  SwaggerModule.setup(config.API_EXPLORER_PATH, app, doc);

  await app.listen(config.PORT);
  Logger.log(
    `Server start on ${config.HOST}:${config.PORT}`,
    'Bootstrap',
    true,
  );
}
bootstrap();
