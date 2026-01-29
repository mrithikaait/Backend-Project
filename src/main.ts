import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import path from 'node:path';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

(global as any).crypto = crypto;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: "http://localhost:3001",   
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const configService = app.get(ConfigService);

  console.log('Running in:', process.env.NODE_ENV);

  
  const port = Number(configService.get('app.port')) || 3000;
  const dbHost = configService.get<string>('database.host');
  const mailUser = configService.get<string>('mail.user');

  console.log('APP PORT:', port);
  console.log('DB HOST:', dbHost);
  console.log('MAIL USER:', mailUser);
  console.log('REDIS HOST:', configService.get('redis.host'));
  console.log('REDIS PORT:', configService.get('redis.port'));

 
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(port);
}

bootstrap();