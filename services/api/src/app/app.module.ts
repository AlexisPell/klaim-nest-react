import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './../auth/auth.module';
import { UserModule } from './../user/user.module';
import { QuoteModule } from './../quote/quote.module';
import { AuthorModule } from './../author/author.module';
import { BootStrapService } from './../bootstrap.service';

import { Quote } from 'src/quote/quote.model';
import { User } from 'src/user/user.model';
import { Author } from 'src/author/author.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [User, Author, Quote],
    }),
    AuthModule,
    UserModule,
    QuoteModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService, BootStrapService],
})
export class AppModule {}
