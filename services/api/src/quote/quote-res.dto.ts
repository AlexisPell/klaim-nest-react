import { ApiProperty, PickType } from '@nestjs/swagger';
import { Quote } from './quote.model';

class QuoteResDto extends PickType(Quote, [
  'id',
  'quote',
  'authorId',
  'createdAt',
  'updatedAt',
]) {
  constructor(quote: Partial<Quote>) {
    super();
    Object.assign(this, quote);
  }
}

class DataQuoteResDto {
  @ApiProperty({ type: QuoteResDto })
  quote: QuoteResDto;
}

export class QuoteDtoResponse {
  @ApiProperty({ type: Boolean })
  success: boolean;

  @ApiProperty({ type: DataQuoteResDto })
  data: DataQuoteResDto;

  constructor(quote: Partial<Quote>) {
    Object.assign(this, {
      success: true,
      data: {
        quote: new QuoteResDto(quote),
      },
    });
  }
}
