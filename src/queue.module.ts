import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { EmailService } from './services/email.service';
import { EmailProcessor } from './email.processor';

@Module({
  imports: [
    // 🔹 Register the queue here
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  providers: [
    EmailService, // producer (adds jobs)
    EmailProcessor, // 🔴 PROCESSOR REGISTERED HERE
  ],
  exports: [
    EmailService, // so cron / other modules can use it
  ],
})
export class EmailQueueModule {}
