import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { EmailQueueModule } from './queue.module';
@Module({
  imports: [
    EmailQueueModule, 
  ],
  providers: [TasksService],
})
export class TasksModule {}
