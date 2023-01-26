import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../user.model';

class UserResDto extends PickType(User, ['id', 'email', 'fullname']) {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}

class UserDataResDto {
  @ApiProperty({ type: UserResDto })
  user: UserResDto;
}

export class UserDtoResponse {
  @ApiProperty({ type: Boolean })
  success: boolean;

  @ApiProperty({ type: UserDataResDto })
  data: UserDataResDto;

  constructor(user: Partial<User>) {
    Object.assign(this, {
      success: true,
      data: {
        user: new UserResDto(user),
      },
    });
  }
}
