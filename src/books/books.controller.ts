import { Body, Controller, Post } from '@nestjs/common';
import { BookEntity } from './entity/books.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './lib/createBook.dto';
import { GenreEntity } from './entity/genre.entity';
import { CreateGenreDto } from './lib/createGenre.dto';
import { CreateAuthorDto } from './lib/createAuthor.dto';
import { AuthorEntity } from './entity/author.entity';

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
}
