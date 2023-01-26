import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Author } from '../author.model';

class AuthorResDto extends PickType(Author, [
  'id',
  'name',
  'createdAt',
  'updatedAt',
]) {
  constructor(author: Partial<Author>) {
    super();
    Object.assign(this, author);
  }
}

class AuthorDataResDto {
  @ApiProperty({ type: AuthorResDto })
  @Type(() => AuthorResDto)
  author: AuthorResDto;
}
export class AuthorDtoResponse {
  @ApiProperty({ type: Boolean })
  success: boolean;

  @ApiProperty({ type: AuthorDataResDto })
  @Type(() => AuthorDataResDto)
  data: AuthorDataResDto;

  constructor(author: Partial<Author>) {
    Object.assign(this, {
      success: true,
      data: {
        author: new AuthorResDto(author),
      },
    });
  }
}
