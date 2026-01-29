import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { Injectable } from '@nestjs/common';

@Processor('emailQueue') 
@Injectable()
export class EmailProcessor {
  @Process('sendMail') 
  async handleSendMail(job: Job) {
    console.log(' Sending email to:', job.data.to);

    
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(' Email sent to:', job.data.to);
  }
}
