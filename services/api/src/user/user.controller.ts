import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { UserDtoResponse } from './dto/create-user-res.dto';
import { User } from './user.model';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({
    type: UserDtoResponse,
  })
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    const user = await this.userService.createUser(userDto);
    return new UserDtoResponse(user);
  }
}
