import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { CommentsEntity } from '../users/entity/comments.entity';
import { AuthorEntity } from './entity/author.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';
import { BooksService } from './books.service';
import { CreateCommentDto } from '../users/lib/createComment.dto';
import { CreateAuthorDto } from './lib/create/createAuthor.dto';
import { PageOptionsDto } from './lib/paginate/pageOptions.dto';
import { CreateGenreDto } from './lib/create/createGenre.dto';
import { CreateBookDto } from './lib/create/createBook.dto';
import { PageDto } from './lib/paginate/page.dto';

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

  @Get('paginate')
  @HttpCode(HttpStatus.OK)
  async paginateBooks(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateBookDto>> {
    return this.booksService.findAllBooksService(pageOptionsDto);
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
