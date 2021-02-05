import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

  @Get()
  getAll() {
    return "All tasks";
  }

  // should place before ":id"
  @Get("search")
  searchTask(@Query('date') completionDate:string) {
    return `Due on ${completionDate}: tasks`
  }

  @Get('/:id')
  getTask(@Param('id') taskId: string) {
    return `This will return a task with the id: ${taskId}`
  }

  @Post()
  createTask(@Body() taskData) {
    return taskData;
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    return `This will delete a task with the id: ${taskId}`
  }

  @Patch(':id')
  updateTask(@Param('id') taskId: string, @Body() updateData) {
    return {
      updatedTask: taskId,
      updateData
      //...updateData
    }
  }
}


// {
// 	"taskId": "abc-123-1",
//   "name": "Learning NestJS",
//   "completionDate": "2021-02-14",
// }