import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginDtoResponse } from './dto/login.dto';
import { RegisterDto, RegisterDtoResponse } from './dto/register.dto';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @ApiOkResponse({ type: LoginDtoResponse })
  @Post('login')
  async login(@Body() userDto: LoginDto) {
    const { token } = await this.authService.login(userDto);
    return new LoginDtoResponse(token);
  }

  // @ApiOkResponse({ type: RegisterDtoResponse })
  @Post('register')
  async registration(@Body() userDto: RegisterDto) {
    const { token } = await this.authService.registration(userDto);
    return new RegisterDtoResponse(token);
  }
}
