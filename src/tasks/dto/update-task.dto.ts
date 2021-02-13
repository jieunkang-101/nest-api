// DTO: Data Transfer Object

import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

// export class UpdateTaskDto {
//   @IsString()
//   readonly taskId?: string;

//   @IsString()
//   readonly name?: string;

//   @IsString()
//   readonly completionDate?: string;

//   @IsString({ each: true })
//   readonly categories?: string[];
// }
