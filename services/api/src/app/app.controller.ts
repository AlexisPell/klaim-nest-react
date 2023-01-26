import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth-guard';

@ApiTags('Root api')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Health check' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Info' })
  @UseGuards(JwtAuthGuard)
  @Get('info')
  getInfo(): string {
    return this.appService.getInfo();
  }
}
