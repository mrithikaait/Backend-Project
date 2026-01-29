import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { Injectable } from '@nestjs/common';

@Processor('emailQueue') // 🔹 Listen to this queue
@Injectable()
export class EmailProcessor {
  @Process('sendMail') // 🔹 Listen to this job type
  async handleSendMail(job: Job) {
    console.log(' Sending email to:', job.data.to);

    // simulate heavy work
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(' Email sent to:', job.data.to);
  }
}
