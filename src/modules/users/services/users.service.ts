import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../repositories/users.repository.js';
import { User } from '../entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async create(user: Partial<User>): Promise<User> {
    return this.usersRepository.create(user);
  }
}
