import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { EmailQueueModule } from './queue.module'; // 🔴 import module

@Module({
  imports: [
    EmailQueueModule, // 🔴 THIS IS REQUIRED
  ],
  providers: [TasksService],
})
export class TasksModule {}
