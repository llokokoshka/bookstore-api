import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { BooksRepository } from './books.repository';
import { AuthorEntity } from './entity/author.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';
import { CreateAuthorDto } from './lib/create/createAuthor.dto';
import { PageOptionsDto } from './lib/paginate/pageOptions.dto';
import { CreateGenreDto } from './lib/create/createGenre.dto';
import { CreateBookDto } from './lib/create/createBook.dto';
import { PageDto } from './lib/paginate/page.dto';
import { CreateCommentDto } from './lib/createComment.dto';
import { UserEntity } from '../users/entity/users.entity';
import { CommentsEntity } from './entity/comments.entity';
import { IBooksAndArrOfIDBook } from './lib/types';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(private booksRepository: BooksRepository) {}

  async createBookService(Book: CreateBookDto): Promise<BookEntity> {
    try {
      const book = await this.booksRepository.createBookRepository(Book);
      return book;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Unable to create book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createGenreService(Genre: CreateGenreDto): Promise<GenreEntity> {
    try {
      const genre = await this.booksRepository.createGenreRepository(Genre);
      return genre;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Unable to create genre',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createAuthorService(Author: CreateAuthorDto): Promise<AuthorEntity> {
    try {
      const author = await this.booksRepository.createAuthorRepository(Author);
      return author;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Unable to create author',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBookService(id: number): Promise<BookEntity> {
    try {
      const Book = await this.booksRepository.getBookRepository(id);

      return Book;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
  }

  // async getAllBooksService(): Promise<BookEntity[]> {
  //   try {
  //     const Book = await this.booksRepository.getAllBooksRepository();
  //     return Book;
  //   } catch (err) {
  //     this.logger.error(err);
  //     throw new HttpException('Books not found', HttpStatus.NOT_FOUND);
  //   }
  // }

  async findAllBooksService(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateBookDto>> {
    try {
      const Book =
        await this.booksRepository.findAllPaginatedRepository(pageOptionsDto);
      return Book;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Books not found', HttpStatus.NOT_FOUND);
    }
  }

  async getRecommendedBooksService(
    bookId: number,
  ): Promise<IBooksAndArrOfIDBook> {
    try {
      const recommendedBooks =
        await this.booksRepository.getRecommendedBooksRepository(bookId);
      return recommendedBooks;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Recommended books not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateBookCover(filename: string, bookId: number): Promise<BookEntity> {
    try {
      const book = await this.booksRepository.updateBookCoverRepository(
        filename,
        bookId,
      );
      return book;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Book update error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addOrUpdateRate(bookId: number, userId: number, value: number) {
    try {
      return this.booksRepository.addOrUpdateRate(bookId, userId, value);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Rate update error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAverageRating(bookId: number) {
    try {
      return this.booksRepository.getAverageRating(bookId);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Average rating error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCommentService(
    Comment: CreateCommentDto,
    bookId: number,
    user: Partial<UserEntity>,
  ): Promise<CommentsEntity> {
    try {
      const comment = await this.booksRepository.createCommentRepository(
        Comment.text,
        user,
        bookId,
      );
      return comment;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Unable to create comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCommentsByBookService(bookId: number) {
    try {
      const comments =
        await this.booksRepository.findCommentsByBookRepository(bookId);
      const correctComments = comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        dateOfCreate: comment.dateOfCreate,
        user: {
          id: comment.user.id,
          fullName: comment.user.fullName,
          avatar: comment.user.avatar,
        },
      }));
      return correctComments;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Can`t get comments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
