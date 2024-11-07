import { Module } from '@nestjs/common';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entity/books.entity';
import { AuthorEntity } from './entity/author.entity';
import { BookToGenreEntity } from './entity/bookGenre.entity';
import { GenreEntity } from './entity/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      AuthorEntity,
      BookToGenreEntity,
      GenreEntity,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule {}
