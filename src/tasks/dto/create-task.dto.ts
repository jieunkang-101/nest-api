// DTO: Data Transfer Object

import { IsString } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  readonly taskId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly completionDate: string;

  @IsString({ each: true })
  readonly categories: string[];
}
