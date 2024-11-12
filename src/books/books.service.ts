import { Injectable } from '@nestjs/common';

import { BooksRepository } from './books.repository';
import { BookEntity } from './entity/books.entity';
import { CreateBookDto } from './lib/createBook.dto';
import { CreateGenreDto } from './lib/createGenre.dto';
import { GenreEntity } from './entity/genre.entity';
import { CreateAuthorDto } from './lib/createAuthor.dto';
import { AuthorEntity } from './entity/author.entity';
import { CommentsEntity } from 'src/users/entity/comments.entity';
import { CreateCommentDto } from 'src/users/lib/createComment.dto';
// import { PageService } from './page.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from './lib/dtos';
import { PageDto } from './lib/page.dto';
// import { BooksFilterDTO } from './lib/booksFilter.dto';

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

  async createCommentService(
    Comment: CreateCommentDto,
  ): Promise<CommentsEntity> {
    const comment = await this.booksRepository.createCommentRepository(Comment);
    return comment;
  }

  async getBookService(id: number): Promise<BookEntity> {
    const Book = await this.booksRepository.getBookRepository(id);
    return Book;
  }

  async getAllBooksService(): Promise<BookEntity[]> {
    const Book = await this.booksRepository.getAllBooksRepository();
    return Book;
  }

  async findAllBooksService( pageOptionsDto: PageOptionsDto,
): Promise<PageDto<CreateBookDto>> {
    const Book = await this.booksRepository.findAllPaginatedRepository(pageOptionsDto);
    return Book;
  }
}
