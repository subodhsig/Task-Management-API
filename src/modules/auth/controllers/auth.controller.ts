import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterDto } from '../dto/register.dto.js';
import { AuthService } from '../services/auth.service.js';
import { LoginDto } from '../dto/login.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already registered',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        id: 1,
        email: 'john@example.com',
      },
    },
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid email or password',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        accessToken: ' return token',
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
