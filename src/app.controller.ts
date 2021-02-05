import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// Get an url then execute the funciton (like router on express)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  sayHello(): string {
    return this.appService.getHi();
  }
}
