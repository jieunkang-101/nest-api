import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// @ Decorators can add functionality to a class
@Module({
  imports: [],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
