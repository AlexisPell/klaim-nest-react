import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getInfo(): string {
    return `Klaim.ai - The only claim funding platform for healthcare providers.
      We improve profitability and cash flow
      for healthcare providers.
      Klaim.ai helps healthcare providers ease their cash flow constraints
      by purchasing pending medical claims in less than 7 days.`;
  }
}
