import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { BookEntity } from './entity/books.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './lib/createBook.dto';
import { GenreEntity } from './entity/genre.entity';
import { CreateGenreDto } from './lib/createGenre.dto';
import { CreateAuthorDto } from './lib/createAuthor.dto';
import { AuthorEntity } from './entity/author.entity';
import { CommentsEntity } from '../users/entity/comments.entity';
import { CreateCommentDto } from '../users/lib/createComment.dto';

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
}
