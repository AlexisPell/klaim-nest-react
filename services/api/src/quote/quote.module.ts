import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorModule } from 'src/author/author.module';
import { QuoteController } from './quote.controller';
import { Quote } from './quote.model';
import { QuoteService } from './quote.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Quote]),
    forwardRef(() => AuthorModule),
    JwtModule,
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
  exports: [QuoteService],
})
export class QuoteModule {}
