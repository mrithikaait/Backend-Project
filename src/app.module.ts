import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';

import configuration from './config/configuration';

import { UsersModule } from './modules/users.module';
import { SeedModule } from './modules/seed.module';
import { AuthModule } from './modules/auth.module';
import { ProductsModule } from './modules/products.module';
import { MailModule } from './modules/mail.module';
import { TasksModule } from './tasks.module';
import { StudentsModule } from './modules/students.module';
import { PaymentsModule } from './modules/payments.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    // 🔹 Load ONLY YAML config (no .env)
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // 🔹 Enable Cron Jobs
    ScheduleModule.forRoot(),

    // 🔹 Redis / Bull (from YAML)
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('redis.host') || '127.0.0.1',
          port: Number(config.get('redis.port')) || 6379,
        },
      }),
    }),

    // 🔹 MongoDB (from YAML)
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: `mongodb://${config.get('database.host')}:${config.get('database.port')}/${config.get('database.name')}`,
      }),
    }),

    // 🔹 Your feature modules (ALL API MODULES HERE 👇)
    UsersModule,
    SeedModule,
    AuthModule,
    ProductsModule,
    MailModule,
    TasksModule,
    StudentsModule,
    PaymentsModule, // ✅ Correct place for Students API
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
