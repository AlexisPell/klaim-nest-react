import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuoteModule } from 'src/quote/quote.module';
import { AuthorController } from './author.controller';
import { Author } from './author.model';
import { AuthorService } from './author.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Author]),
    forwardRef(() => QuoteModule),
    JwtModule,
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
