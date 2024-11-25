import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { BookToGenreEntity } from './entity/bookGenre.entity';
import { AuthorEntity } from './entity/author.entity';
import { CoverEntity } from './entity/covers.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';
import { RateEntity } from './entity/rate.entity';
import { UserRepository } from '../users/users.repository';
import { UserEntity } from '../users/entity/users.entity';
import { CommentsEntity } from './entity/comments.entity';
import { UsersService } from '../users/users.service';

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
    UserRepository,
    UsersService,
  ],
  exports: [BooksService, TypeOrmModule, BooksRepository],
})
export class BooksModule {}
