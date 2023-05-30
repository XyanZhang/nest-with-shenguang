import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  renderUser(): object {
    return {
      name: 'kenan',
      age: 21
    }
  }
}
