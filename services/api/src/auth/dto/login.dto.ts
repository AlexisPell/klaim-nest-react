import { RegisterDtoResponse } from './register.dto';
import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class LoginDto extends OmitType(CreateUserDto, ['fullname']) {}

export class LoginDtoResponse extends RegisterDtoResponse {}
