import { Body, Controller, Post } from '@nestjs/common';
import { BookEntity } from './entity/books.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('create')
  create(@Body() book: BookEntity): Promise<BookEntity> {
    return this.booksService.create(book);
  }
}
