import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '../user.model';

// class UserDtoResult {
//   @Exclude()
//   password;

//   constructor(user: Partial<User>) {
//     Object.assign(this, user);
//   }
// }

// export class UserDtoResponse {
//   @ApiProperty({ type: Boolean })
//   success: boolean;

//   @ApiProperty({ type: { user: User } })
//   data: {
//     user: User;
//   };

//   constructor(user: Partial<User>) {
//     Object.assign(this, {
//       success: true,
//       data: {
//         user: new UserDtoResult(user),
//       },
//     });
//   }
// }

class UserResDto extends PickType(User, ['id', 'email']) {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}

class DataResDto {
  @ApiProperty({ type: UserResDto })
  user: UserResDto;
}

export class UserDtoResponse {
  @ApiProperty({ type: Boolean })
  success: boolean;

  @ApiProperty({ type: DataResDto })
  data: DataResDto;

  constructor(user: Partial<User>) {
    Object.assign(this, {
      success: true,
      data: {
        user: new UserResDto(user),
      },
    });
  }
}
