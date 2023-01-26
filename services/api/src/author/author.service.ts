import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { QuoteService } from 'src/quote/quote.service';
import { Author } from './author.model';
import { authors } from './data/default';

@Injectable()
export class AuthorService {
  constructor(
    @Inject(forwardRef(() => QuoteService)) private quoteService: QuoteService,
    @InjectModel(Author) private authorRepository: typeof Author,
  ) {}

  async onBootstrap() {
    const count = await this.authorRepository.count();
    if (count === 0) {
      this.authorRepository.bulkCreate(authors);
    }
  }

  async getRandomAuthor() {
    const { dataValues: randomAuthor } = await this.authorRepository.findOne({
      order: Sequelize.literal('random()'),
    });
    return randomAuthor;
  }
}
