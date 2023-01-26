import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthorService } from 'src/author/author.service';
import { quotes } from './data/default';
import { Quote } from './quote.model';

@Injectable()
export class QuoteService {
  constructor(
    @Inject(forwardRef(() => AuthorService))
    private authorService: AuthorService,
    @InjectModel(Quote) private quoteRepository: typeof Quote,
  ) {}

  async onBootstrap() {
    const count = await this.quoteRepository.count();
    if (count === 0) {
      this.quoteRepository.bulkCreate(quotes);
    }
  }

  getRandomAuthor() {
    console.log('qe');
  }
}
