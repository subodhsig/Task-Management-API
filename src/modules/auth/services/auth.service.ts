import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service.js';
import { LoginDto } from '../dto/login.dto.js';
import { RegisterDto } from '../dto/register.dto.js';
import { TokenService } from './token/token.service.js';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterDto) {
    //email needs to be stored in lowercase to avoid case sensitivity issues
    const email = registerDto.email.trim().toLowerCase();

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    let user;

    try {
      user = await this.usersService.create({
        email,
        password: hashedPassword,
      });
    } catch (error) {
      if (
        //THIS IS TO HANDLE IF SAME EMAIL IS REGISTERED SIMULTANEOUSLY IN DIFFERENT REQUESTS
        error instanceof QueryFailedError &&
        //ERROR CODDE 23505 IS FOR UNIQUE CONSTRAINT VIOLATION IN POSTGRESQL
        (error as { driverError?: { code?: string } }).driverError?.code ===
          '23505'
      ) {
        throw new ConflictException('Email already registered');
      }

      throw error;
    }

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async login(loginDto: LoginDto) {
    //email needs to be stored in lowercase to avoid case sensitivity issues
    const email = loginDto.email.trim().toLowerCase();

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    //BCRYPT MATCHING TO CHECK PASSWORD

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }
    //return jwt accesss token
    const accessToken = this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
