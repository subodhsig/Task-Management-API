import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete NestJS assessment',
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Finish the Task Management API',
    description: 'Optional task description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
