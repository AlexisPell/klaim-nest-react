import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokenDtoResponse } from './dto/token-res.dto';
import { MyRequest } from 'src/common/interfaces/request.interface';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { ProfileDtoResponse } from './dto/profile-res.dto';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ type: TokenDtoResponse })
  @Post('login')
  async login(@Body() userDto: LoginDto) {
    const { token } = await this.authService.login(userDto);
    return new TokenDtoResponse(token);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiOkResponse({ type: TokenDtoResponse })
  @Post('register')
  async registration(@Body() userDto: RegisterDto) {
    const { token } = await this.authService.registration(userDto);
    return new TokenDtoResponse(token);
  }

  @ApiOperation({ summary: 'Get my profile' })
  @ApiResponse({ type: ProfileDtoResponse })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getMyProfile(@Req() { user }: MyRequest) {
    const profile = await this.authService.getMyProfile(user.email);
    return new ProfileDtoResponse(profile);
  }
}
