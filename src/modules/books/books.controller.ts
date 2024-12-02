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
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { AuthorEntity } from './entity/author.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';
import { CommentsEntity } from './entity/comments.entity';
import { BooksService } from './books.service';
import { UsersService } from '../users/users.service';
import { ReqGetUserDto } from '../users/lib/reqGetUser.dto';
import { CreateAuthorDto } from './lib/create/createAuthor.dto';
import { PageOptionsDto } from './lib/paginate/pageOptions.dto';
import { CreateGenreDto } from './lib/create/createGenre.dto';
import { CreateBookDto } from './lib/create/createBook.dto';
import { PageDto } from './lib/paginate/page.dto';
import { CreateCommentDto } from './lib/createComment.dto';
import { visibleParamsOfUser } from '../auth/utils/auth.utils';

@Controller('books')
export class BooksController {
  constructor(
    private booksService: BooksService,
    private userService: UsersService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Post(':bookId/comment')
  async createComment(
    @Req() req: ReqGetUserDto,
    @Param('bookId') bookId: number,
    @Body() dto: CreateCommentDto,
  ): Promise<CommentsEntity> {
    const user = await this.userService.getUserForServer(req.user.id);
    const correctFormOfUser = visibleParamsOfUser(user);
    return this.booksService.createCommentService(
      dto,
      bookId,
      correctFormOfUser,
    );
  }

  @Get(':bookId/comment')
  async getComments(@Param('bookId') bookId: number) {
    return this.booksService.getCommentsByBookService(bookId);
  }

  @UseGuards(AuthGuard)
  @Post(':bookId/rating')
  async addOrUpdateRate(
    @Req() req: ReqGetUserDto,
    @Param('bookId') bookId: number,
    @Body('value') value: number,
  ) {
    return this.booksService.addOrUpdateRate(bookId, req.user.id, value);
  }

  @Get(':bookId/rating')
  async getAverageRating(@Param('bookId') bookId: number) {
    return this.booksService.getAverageRating(bookId);
  }

  @Get(':bookId')
  async getBook(@Param('bookId', ParseIntPipe) bookId: number) {
    let book = await this.booksService.getBookService(bookId);
    return book;
  }
}
