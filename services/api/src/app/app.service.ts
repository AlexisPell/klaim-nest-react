import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getInfo(): string {
    return 'Some information about the <b>company</b>.';
  }
}
