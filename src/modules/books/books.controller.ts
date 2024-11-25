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
  Req,
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
import { ReqGetUserDto } from '../users/lib/reqGetUser.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async createBook(@Body() book: CreateBookDto): Promise<BookEntity> {
    return this.booksService.createBookService(book);
  }

  @Post('genre')
  async createGenre(@Body() genre: CreateGenreDto): Promise<GenreEntity> {
    return this.booksService.createGenreService(genre);
  }

  @Post('author')
  async createAuthor(@Body() author: CreateAuthorDto): Promise<AuthorEntity> {
    return this.booksService.createAuthorService(author);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async paginateBooks(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateBookDto>> {
    return this.booksService.findAllBooksService(pageOptionsDto);
  }

  @Post(':id/rating')
  async addOrUpdateRate(
    @Req() req: ReqGetUserDto,
    @Param('id') bookId: number,
    @Body('value') value: number,
  ) {
    return this.booksService.addOrUpdateRate(bookId, req.user.id, value);
  }

  @Get(':id/rating')
  async getAverageRating(@Param('id') bookId: number) {
    return this.booksService.getAverageRating(bookId);
  }

  @Get(':id')
  async getBook(@Param('id', ParseIntPipe) id: number) {
    let book = await this.booksService.getBookService(id);
    return book;
  }
}
