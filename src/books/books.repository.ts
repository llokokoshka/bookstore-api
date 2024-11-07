import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookEntity } from './entity/books.entity';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ) {}

  async createBook(book: BookEntity): Promise<BookEntity> {
    return this.booksRepository.save(book);
  }
}
