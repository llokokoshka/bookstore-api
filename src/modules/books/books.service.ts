import { Injectable } from '@nestjs/common';

import { BooksRepository } from './books.repository';
import { AuthorEntity } from './entity/author.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';
import { CreateAuthorDto } from './lib/create/createAuthor.dto';
import { PageOptionsDto } from './lib/paginate/pageOptions.dto';
import { CreateGenreDto } from './lib/create/createGenre.dto';
import { CreateBookDto } from './lib/create/createBook.dto';
import { PageDto } from './lib/paginate/page.dto';

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

  async getBookService(id: number): Promise<BookEntity> {
    const Book = await this.booksRepository.getBookRepository(id);

    return Book;
  }

  async getAllBooksService(): Promise<BookEntity[]> {
    const Book = await this.booksRepository.getAllBooksRepository();
    return Book;
  }

  async findAllBooksService(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateBookDto>> {
    const Book =
      await this.booksRepository.findAllPaginatedRepository(pageOptionsDto);
    return Book;
  }

  async updateBookCover(filename: string, bookId: number): Promise<BookEntity> {
    const book = await this.booksRepository.updateBookCoverRepository(
      filename,
      bookId,
    );
    return book;
  }

  async addOrUpdateRate(bookId: number, userId: number, value: number) {
    return this.booksRepository.addOrUpdateRate(bookId, userId, value);
  }

  async getAverageRating(bookId: number) {
    return this.booksRepository.getAverageRating(bookId);
  }
}
