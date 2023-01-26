import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { QuoteDtoResponse } from './quote-res.dto';
import { QuoteService } from './quote.service';

@ApiTags('Qoute')
@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @ApiOperation({ summary: 'Get random quote by author' })
  @ApiOkResponse({ type: QuoteDtoResponse })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getRandomAuthor(@Query('authorId') authorId: string) {
    const randomQuote = await this.quoteService.getRandomQuoteByAuthorId(
      Number(authorId),
    );

    return new QuoteDtoResponse(randomQuote);
  }
}
