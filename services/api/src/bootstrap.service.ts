import { Injectable } from '@nestjs/common';
import { AuthorService } from './author/author.service';
import { QuoteService } from './quote/quote.service';

@Injectable()
export class BootStrapService {
  constructor(
    private authorService: AuthorService,
    private quoteService: QuoteService,
  ) {}

  async bootstrap() {
    await Promise.all([
      this.authorService.onBootstrap(),
      this.quoteService.onBootstrap(),
    ]);
  }
}
