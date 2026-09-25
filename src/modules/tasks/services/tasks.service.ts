import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TasksRepository } from '../repositories/tasks.repository.js';
import { CreateTaskDto } from '../dto/create-task.dto.js';
import { TaskQueryDto } from '../dto/task-query.dto.js';
import { UpdateTaskDto } from '../dto/update-task.dto.js';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
    return this.tasksRepository.create({
      ...createTaskDto,
      userId,
      isCompleted: false,
    });
  }

  async findAll(userId: number, query: TaskQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [tasks, total] = await this.tasksRepository.findAllByUserId(
      userId,
      skip,
      limit,
    );

    return {
      data: tasks,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, userId: number) {
    const task = await this.tasksRepository.findByIdAndUserId(id, userId);

    if (task) {
      return task;
    }

    throw new NotFoundException('Task not found');
  }

  async update(id: number, userId: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findTaskForModification(id, userId);

    Object.assign(task, updateTaskDto);

    return this.tasksRepository.update(task);
  }

  async remove(id: number, userId: number) {
    const task = await this.findTaskForModification(id, userId);

    await this.tasksRepository.delete(task);

    return {
      message: 'Task deleted successfully',
    };
  }

  private async findTaskForModification(id: number, userId: number) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }
}
