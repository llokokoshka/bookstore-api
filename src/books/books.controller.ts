import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { BookEntity } from './entity/books.entity';
import { GenreEntity } from './entity/genre.entity';
import { AuthorEntity } from './entity/author.entity';
import { CommentsEntity } from '../users/entity/comments.entity';
import { CreateBookDto } from './lib/createBook.dto';
import { CreateGenreDto } from './lib/createGenre.dto';
import { CreateAuthorDto } from './lib/createAuthor.dto';
import { CreateCommentDto } from '../users/lib/createComment.dto';
import { BooksFilterDTO } from './lib/booksFolter.dto';

interface Books {
  id: number;
  name: number;
}

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('create')
  async createBook(@Body() book: CreateBookDto): Promise<BookEntity> {
    return this.booksService.createBookService(book);
  }

  @Post('createGenre')
  async createGenre(@Body() genre: CreateGenreDto): Promise<GenreEntity> {
    return this.booksService.createGenreService(genre);
  }

  @Post('createAuthor')
  async createAuthor(@Body() author: CreateAuthorDto): Promise<AuthorEntity> {
    return this.booksService.createAuthorService(author);
  }

  @Post(':id')
  async createComment(
    @Body() comment: CreateCommentDto,
  ): Promise<CommentsEntity> {
    return this.booksService.createCommentService(comment);
  }

  @Get(':id')
  async getBook(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
    return this.booksService.getBookService(id);
  }

  @Get()
  async getAllBooks(): Promise<BookEntity[]> {
    return this.booksService.getAllBooksService();
  }

  @Get()
  async list(
    @Query() filter: BooksFilterDTO & BookEntity,
  ): Promise<BookEntity[]> {
    return this.booksService.findAllBooksService();
  }
}
