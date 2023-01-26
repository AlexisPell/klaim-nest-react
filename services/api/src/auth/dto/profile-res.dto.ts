import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/user.model';

class ProfileResDto extends PickType(User, [
  'id',
  'email',
  'fullname',
  'createdAt',
  'updatedAt',
]) {
  @Exclude()
  password: string;

  constructor(profile: Partial<User>) {
    super();
    Object.assign(this, profile);
  }
}

class ProfileDataResDto {
  @ApiProperty({ type: ProfileResDto })
  profile: ProfileResDto;
}

export class ProfileDtoResponse {
  @ApiProperty({ type: Boolean })
  success: boolean;

  @ApiProperty({ type: ProfileDataResDto })
  data: ProfileDataResDto;

  constructor(profile: Partial<User>) {
    Object.assign(this, {
      success: true,
      data: {
        profile: new ProfileResDto(profile),
      },
    });
  }
}
