import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { CommentsEntity } from 'src/users/entity/comments.entity';
import { BookToGenreEntity } from './entity/bookGenre.entity';
import { CoverTypeEntity } from './entity/coverType.entity';
import { AuthorEntity } from './entity/author.entity';
import { CoverEntity } from './entity/covers.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      AuthorEntity,
      BookToGenreEntity,
      GenreEntity,
      CoverEntity,
      CoverTypeEntity,
      CommentsEntity,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule { }
