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

import { BooksService } from './books.service';
import { BookEntity } from './entity/books.entity';
import { GenreEntity } from './entity/genre.entity';
import { AuthorEntity } from './entity/author.entity';
import { CommentsEntity } from '../users/entity/comments.entity';
import { CreateBookDto } from './lib/createBook.dto';
import { CreateGenreDto } from './lib/createGenre.dto';
import { CreateAuthorDto } from './lib/createAuthor.dto';
import { CreateCommentDto } from '../users/lib/createComment.dto';
// import { BooksFilterDTO } from './lib/booksFilter.dto';
import { PageOptionsDto } from './lib/dtos';
import { PageDto } from './lib/page.dto';

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
  
    @Get('paginate')
    @HttpCode(HttpStatus.OK)
    async paginateBooks(
      @Query() pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<CreateBookDto>> {
      console.log(pageOptionsDto)
      return this.booksService.findAllBooksService(pageOptionsDto);
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
  // async list(
  //   @Query('pageNum', ParseIntPipe) filter: BooksFilterDTO,
  // ) {
  //   console.log('Pagination Filter:', filter);
  //   return {
  //     pageNum: filter.pageNum,
  //     pageSize: filter.pageSize,
  //   };
  //   // return this.booksService.findAllBooksService(filter);
  // }
// }
