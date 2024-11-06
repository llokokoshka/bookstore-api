import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Book } from './entity/books.entity';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async createBook(book: Book): Promise<Book> {
    return this.booksRepository.save(book);
  }
}
