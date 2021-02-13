// DTO: Data Transfer Object

import { IsOptional, IsString } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  readonly taskId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly completionDate: string;

  @IsOptional()
  @IsString({ each: true })
  readonly categories: string[];
}
