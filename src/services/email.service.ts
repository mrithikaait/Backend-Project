import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

  async addEmailJob(email: string) {
    await this.emailQueue.add('sendMail', { to: email });
    console.log(' Job added to queue for:', email);
  }
}
