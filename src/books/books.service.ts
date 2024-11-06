import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './entity/books.entity';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async create(Book: Book) {
    const book = await this.booksRepository.createBook(Book);
    return book;
  }
}
