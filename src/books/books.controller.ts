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

import { AuthorEntity } from './entity/author.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';
import { BooksService } from './books.service';
import { CreateAuthorDto } from './lib/create/createAuthor.dto';
import { PageOptionsDto } from './lib/paginate/pageOptions.dto';
import { CreateGenreDto } from './lib/create/createGenre.dto';
import { CreateBookDto } from './lib/create/createBook.dto';
import { PageDto } from './lib/paginate/page.dto';
import { CommentsService } from 'src/comments/comments.service';

@Controller('books')
export class BooksController {
  constructor(
    private booksService: BooksService,
    private commentsService: CommentsService,
  ) {}

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

  @Get(':id')
  async getBook(@Param('id', ParseIntPipe) id: number) {
    let book = await this.booksService.getBookService(id);
    return book;
  }

  @Get()
  async getAllBooks(): Promise<BookEntity[]> {
    return this.booksService.getAllBooksService();
  }
}
