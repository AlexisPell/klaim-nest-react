import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorModule } from 'src/author/author.module';
import { QuoteController } from './quote.controller';
import { Quote } from './quote.model';
import { QuoteService } from './quote.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Quote]),
    forwardRef(() => AuthorModule),
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
  exports: [QuoteService],
})
export class QuoteModule {}
