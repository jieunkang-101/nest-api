import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.tasksService.getTasks();
  }

  // "search" should place before ":id"
  @Get('search')
  searchTask(@Query('date') completionDate: string) {
    return `Due on ${completionDate}: tasks`;
  }

  @Get('/:id')
  getTask(@Param('id') id: number): Task {
    console.log(typeof id);
    return this.tasksService.getTask(id);
  }

  @Post()
  createTask(@Body() taskData: CreateTaskDto) {
    return this.tasksService.createTask(taskData);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() updateData: CreateTaskDto) {
    return this.tasksService.updateTask(id, updateData);
  }
}
