import { Injectable } from '@nestjs/common';

import { BooksRepository } from './books.repository';
import { BookEntity } from './entity/books.entity';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async create(Book: BookEntity) {
    const book = await this.booksRepository.createBook(Book);
    return book;
  }
}
