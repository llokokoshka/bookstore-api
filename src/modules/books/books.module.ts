import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
// import { CommentsEntity } from 'src/users/entity/comments.entity';
import { BookToGenreEntity } from './entity/bookGenre.entity';
import { AuthorEntity } from './entity/author.entity';
import { CoverEntity } from './entity/covers.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';
import { CommentsService } from 'src/modules/comments/comments.service';
import { CommentsEntity } from 'src/modules/comments/entity/comments.entity';
import { CommentsRepository } from 'src/modules/comments/comments.repository';
import { RateEntity } from './entity/rate.entity';
import { UserRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/modules/users/entity/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      AuthorEntity,
      BookToGenreEntity,
      GenreEntity,
      CoverEntity,
      CommentsEntity,
      RateEntity,
      UserEntity,
    ]),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    BooksRepository,
    BooksService,
    CommentsService,
    CommentsRepository,
    UserRepository,
  ],
  exports: [BooksService, TypeOrmModule, BooksRepository],
})
export class BooksModule {}
