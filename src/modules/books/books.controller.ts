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
import { BooksService } from './books.service';
import { UsersService } from '../users/users.service';
import { ReqGetUserDto } from '../users/lib/reqGetUser.dto';
import { CreateAuthorDto } from './lib/create/createAuthor.dto';
import { PageOptionsDto } from './lib/paginate/pageOptions.dto';
import { CreateGenreDto } from './lib/create/createGenre.dto';
import { CreateBookDto } from './lib/create/createBook.dto';
import { PageDto } from './lib/paginate/page.dto';
import { CreateCommentDto } from './lib/createComment.dto';
import { IBooksAndArrOfIDBook, IComments } from './lib/types';
import { RateEntity } from './entity/rate.entity';
import { GetRecommendedDto } from './lib/getRecommended.dto';

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

  @Get(':bookId/recommended')
  async getRecommended(
    @Param('bookId') bookId: number,
    @Body() dto: GetRecommendedDto,
  ): Promise<IBooksAndArrOfIDBook> {
    return this.booksService.getRecommendedBooksService(
      bookId,
      dto.numberOfItems,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':bookId/comment')
  async createComment(
    @Req() req: ReqGetUserDto,
    @Param('bookId') bookId: number,
    @Body() dto: CreateCommentDto,
  ): Promise<IComments> {
    const user = await this.userService.getUserForServer(req.user.id);
    const correctFormOfUser = {
      id: user.id,
      fullName: user.fullName,
      avatar: user.avatar,
    };
    const newCommentInfo = await this.booksService.createCommentService(
      dto,
      bookId,
      correctFormOfUser,
    );
    newCommentInfo.user.avatar = `http://localhost:4000/uploads/avatars/${newCommentInfo.user.avatar}`;
    const correctFormOfCommentInfo = {
      text: newCommentInfo.text,
      user: newCommentInfo.user,
      bookId: newCommentInfo.book.id,
      id: newCommentInfo.id,
      dateOfCreate: newCommentInfo.dateOfCreate,
    };
    return correctFormOfCommentInfo;
  }

  @Get(':bookId/comment')
  async getComments(@Param('bookId') bookId: number) {
    return this.booksService.getCommentsByBookService(bookId);
  }

  @Get(':bookId/rating')
  async getAverageRating(@Param('bookId') bookId: number) {
    const rate = await this.booksService.getAverageRating(bookId);
    return { bookId, rate };
  }

  @UseGuards(AuthGuard)
  @Post(':bookId/rating')
  async addOrUpdateRate(
    @Req() req: ReqGetUserDto,
    @Param('bookId') bookId: number,
    @Body('rate') rate: number,
  ): Promise<RateEntity> {
    const newUserRate = await this.booksService.addOrUpdateRate(
      bookId,
      req.user.id,
      rate,
    );
    return newUserRate;
  }

  @Get(':bookId')
  async getBook(@Param('bookId', ParseIntPipe) bookId: number) {
    const book = await this.booksService.getBookService(bookId);
    const totalRate = await this.booksService.getAverageRating(bookId);
    return { book, totalRate };
  }
}
