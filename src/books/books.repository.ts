import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CommentsEntity } from 'src/users/entity/comments.entity';
import { BookToGenreEntity } from './entity/bookGenre.entity';
import { AuthorEntity } from './entity/author.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';
import { CreateCommentDto } from 'src/users/lib/createComment.dto';
import { PageOptionsDto } from './lib/paginate/pageOptions.dto';
import { CreateAuthorDto } from './lib/create/createAuthor.dto';
import { CreateGenreDto } from './lib/create/createGenre.dto';
import { CreateBookDto } from './lib/create/createBook.dto';
import { PageMetaDto } from './lib/paginate/pageMeta.dto';
import { PageDto } from './lib/paginate/page.dto';

@Injectable()
export class BooksRepository {
  repository: Repository<unknown>;
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,

    @InjectRepository(GenreEntity)
    private genreRepository: Repository<GenreEntity>,

    @InjectRepository(BookToGenreEntity)
    private bookGenreRepository: Repository<BookToGenreEntity>,

    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,

    @InjectRepository(CommentsEntity)
    private commentsRepository: Repository<CommentsEntity>,
  ) { }

  async createBookRepository(book: CreateBookDto): Promise<BookEntity> {
    const newBook = this.booksRepository.create(book);
    const saveBook = await this.booksRepository.save(newBook);

    if (book.bookGenres && book.bookGenres.length > 0) {
      for (const genre of book.bookGenres) {
        const genreEntity = await this.genreRepository.findOneBy({
          id: genre.id,
        });
        if (genreEntity) {
          const bookGenre = this.bookGenreRepository.create({
            book: saveBook,
            genre: genreEntity,
          });

          await this.bookGenreRepository.save(bookGenre);
        }
      }
    }
    return saveBook;
  }

  async createGenreRepository(genre: CreateGenreDto): Promise<GenreEntity> {
    const newGenre = this.genreRepository.create(genre);
    return this.genreRepository.save(newGenre);
  }

  async createAuthorRepository(author: CreateAuthorDto): Promise<AuthorEntity> {
    const newAuthor = this.authorRepository.create(author);
    return this.authorRepository.save(newAuthor);
  }

  async createCommentRepository(
    comment: CreateCommentDto,
  ): Promise<CommentsEntity> {
    const newComment = this.commentsRepository.create(comment);
    return this.commentsRepository.save(newComment);
  }

  async getBookRepository(id: number): Promise<BookEntity> {
    return this.booksRepository.findOneBy({ id: id });
  }

  async getAllBooksRepository(): Promise<BookEntity[]> {
    const aa = await this.booksRepository.findAndCount({
      take: 2,
      relations: ['author', 'bookGenres', 'comments', 'rates', 'covers'],
    });
    return this.booksRepository.find({
      relations: ['author', 'bookGenres', 'comments', 'rates', 'covers'],
    });
  }

  async findAllPaginatedRepository(pageOptionsDto: PageOptionsDto) {

    const queryBuilder = this.booksRepository.createQueryBuilder("book");

    if (pageOptionsDto.author) {
      queryBuilder.andWhere("book.author LIKE : author", { author: `%${pageOptionsDto.author}%` });
    }
    if (pageOptionsDto.genres && pageOptionsDto.genres.length > 0) {
      queryBuilder.andWhere("book.id IN (SELECT book.id FROM book_genre bookGenre WHERE bookGenre.genreId IN (:...genres))", { genres: pageOptionsDto.genres, });
    }

    if (pageOptionsDto.minPrice !== undefined) {
      queryBuilder.andWhere("book.price >= :minPrice", { minPrice: pageOptionsDto.minPrice });
    }

    if (pageOptionsDto.maxPrice !== undefined) {
      queryBuilder.andWhere("book.price <= :maxPrice", { maxPrice: pageOptionsDto.maxPrice });
    }

    queryBuilder
      .orderBy("book.name", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);

  }
}
