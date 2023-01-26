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

class DataResDto {
  @ApiProperty({ type: AuthorResDto })
  @Type(() => AuthorResDto)
  author: AuthorResDto;
}

export class AuthorDtoResponse {
  @ApiProperty({ type: Boolean })
  success: boolean;

  @ApiProperty({ type: DataResDto })
  @Type(() => DataResDto)
  data: DataResDto;

  constructor(author: Partial<Author>) {
    Object.assign(this, {
      success: true,
      data: {
        author: new AuthorResDto(author),
      },
    });
  }
}

// BUG in next.js swagger module.
// in GET /author @ApiOkResponse({ type: AuthorDtoResponse })
// and in POST /user @ApiCreatedResponse({ type: UserDtoResponse })

// In both - AuthorDtoResponse and UserDtoResponse we
// got inner Class, NAMED same in both places: "DataResDto"

// And in this case in our swagger docs we always got UserResDto for
// both: GET /author and POST /user.

// Renaming some of these classes solves the problem. Classes has NO intersections.
