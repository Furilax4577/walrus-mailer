import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDefault() {
    return {
      name: 'Mail Microservice',
      status: 'online',
      version: '1.0.0',
      date: new Date(),
    };
  }

  getHealth() {
    return { status: 'ok' };
  }
}
