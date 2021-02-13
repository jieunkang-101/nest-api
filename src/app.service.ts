import { Injectable } from '@nestjs/common';

// Business log (function)
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello NestJS!';
  }

  getHi(): string {
    return 'Hello Jieun';
  }
}
