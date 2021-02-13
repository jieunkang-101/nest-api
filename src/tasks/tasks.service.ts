import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    console.log(this.tasks);
    return this.tasks;
  }

  getTask(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    //"+" => same as parseInt
    // this.tasks.find(t => t.taskId === parseInt(taskId))
    // this.tasks.find((t) => t.id === +id);

    if (!task) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }

    return task;
  }

  deleteTask(id: number) {
    // call getTask function to get error if the task is not exist
    this.getTask(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  createTask(taskData) {
    this.tasks.push({
      id: this.tasks.length + 1,
      ...taskData,
    });
  }

  updateTask(id: number, updateData) {
    const task = this.getTask(id);
    this.deleteTask(id);
    this.tasks.push({ ...task, ...updateData });
  }
}
