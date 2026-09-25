import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity.js';
import { TasksService } from './services/tasks.service.js';
import { TasksRepository } from './repositories/tasks.repository.js';
import { TasksController } from './controllers/tasks.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TasksRepository],
  exports: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
