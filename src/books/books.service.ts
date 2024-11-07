import { Injectable } from '@nestjs/common';

import { BooksRepository } from './books.repository';
import { BookEntity } from './entity/books.entity';
import { CreateBookDto } from './lib/createBook.dto';
import { CreateGenreDto } from './lib/createGenre.dto';
import { GenreEntity } from './entity/genre.entity';
import { CreateAuthorDto } from './lib/createAuthor.dto';
import { AuthorEntity } from './entity/author.entity';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async createBookService(Book: CreateBookDto): Promise<BookEntity> {
    const book = await this.booksRepository.createBookRepository(Book);
    return book;
  }
  async createGenreService(Genre: CreateGenreDto): Promise<GenreEntity> {
    const genre = await this.booksRepository.createGenreRepository(Genre);
    return genre;
  }

  async createAuthorService(Author: CreateAuthorDto): Promise<AuthorEntity> {
    const author = await this.booksRepository.createAuthorRepository(Author);
    return author;
  }
}
