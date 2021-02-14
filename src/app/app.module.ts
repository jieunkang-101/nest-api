import { Module } from '@nestjs/common';

import { TasksModule } from '../tasks/tasks.module';
import { AppController } from './app.controller';

// @ Decorators can add functionality to a class
@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
