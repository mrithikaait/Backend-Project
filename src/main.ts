import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import path from 'node:path';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

// 👇 Make crypto globally available
(global as any).crypto = crypto;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔹 ENABLE CORS (MOST IMPORTANT FIX 🔥)
  app.enableCors({
    origin: "http://localhost:3001",   // your React frontend port
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // Enable JSON & form body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Get ConfigService
  const configService = app.get(ConfigService);

  // Check which environment is running
  console.log('Running in:', process.env.NODE_ENV);

  // Read values from YAML
  const port = Number(configService.get('app.port')) || 3000;
  const dbHost = configService.get<string>('database.host');
  const mailUser = configService.get<string>('mail.user');

  // Test logs
  console.log('APP PORT:', port);
  console.log('DB HOST:', dbHost);
  console.log('MAIL USER:', mailUser);
  console.log('REDIS HOST:', configService.get('redis.host'));
  console.log('REDIS PORT:', configService.get('redis.port'));

  // Make uploads folder public
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Start app
  await app.listen(port);
}

bootstrap();