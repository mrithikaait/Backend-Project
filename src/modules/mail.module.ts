import { Module } from '@nestjs/common';
import { MailController } from '../controllers/mail.controller';
import { MailService } from '../services/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
