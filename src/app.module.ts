import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';

// @ Decorators can add functionality to a class
@Module({
  imports: [],
  controllers: [AppController, TasksController], 
  providers: [AppService],
})
export class AppModule {}
