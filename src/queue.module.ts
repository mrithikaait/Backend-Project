import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { EmailService } from './services/email.service';
import { EmailProcessor } from './email.processor';

@Module({
  imports: [
    
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  providers: [
    EmailService, 
    EmailProcessor, 
  ],
  exports: [
    EmailService, 
  ],
})
export class EmailQueueModule {}
