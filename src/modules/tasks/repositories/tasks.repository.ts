import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from '../entities/task.entity.js';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);

    return this.taskRepository.save(newTask);
  }

  async findAllByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<[Task[], number]> {
    return this.taskRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip,
      take,
    });
  }

  async findByIdAndUserId(id: number, userId: number): Promise<Task | null> {
    return this.taskRepository.findOne({
      where: {
        id,
        userId,
      },
    });
  }

  async findById(id: number): Promise<Task | null> {
    return this.taskRepository.findOne({
      where: { id },
    });
  }

  async update(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async delete(task: Task): Promise<void> {
    await this.taskRepository.softRemove(task);
  }
}
