import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from './email.service';

@Injectable()
export class TasksService {
  constructor(private readonly emailService: EmailService) {}

  @Cron('*/30 * * * * *')
  async handleCron() {
    console.log(' Cron triggered – adding job to queue');

    await this.emailService.addEmailJob('test@gmail.com');

    console.log('Job added by cron');
  }
}
