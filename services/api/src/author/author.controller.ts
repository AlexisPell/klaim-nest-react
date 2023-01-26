import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { Author } from './author.model';
import { AuthorService } from './author.service';
import { AuthorDtoResponse } from './dto/author-res.dto';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @ApiOkResponse({ type: AuthorDtoResponse })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getRandomAuthor() {
    const author = await this.authorService.getRandomAuthor();
    return new AuthorDtoResponse(author);
  }
}
