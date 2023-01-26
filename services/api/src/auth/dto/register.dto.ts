import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {}

export class RegisterDtoResponse {
  @ApiProperty({ type: Boolean })
  success: boolean;

  @ApiProperty({ type: { token: String } })
  data: {
    token: string;
  };

  constructor(token: string) {
    Object.assign(this, {
      success: true,
      data: {
        token,
      },
    });
  }
}
