import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const a = process.env.ONE_SIGNAL_APP_ID;
    console.log('getHello', a);
    return 'Hello World!';
  }
}
