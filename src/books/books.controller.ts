import { Body, Controller, Post } from '@nestjs/common';
import { Book } from './entity/books.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('/create')
  create(@Body() book: Book): Promise<Book> {
    return this.booksService.create(book);
  }
}
