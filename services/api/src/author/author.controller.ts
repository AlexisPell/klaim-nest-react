import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { AuthorService } from './author.service';
import { AuthorDtoResponse } from './dto/author-res.dto';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @ApiOperation({ summary: 'Get random author' })
  @ApiOkResponse({ type: AuthorDtoResponse })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getRandomAuthor() {
    const randomAuthor = await this.authorService.getRandomAuthor();
    return new AuthorDtoResponse(randomAuthor);
  }
}
