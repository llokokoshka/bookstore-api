import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BookToGenreEntity } from './entity/bookGenre.entity';
import { AuthorEntity } from './entity/author.entity';
import { GenreEntity } from './entity/genre.entity';
import { BookEntity } from './entity/books.entity';
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

    // @InjectRepository(CommentsEntity)
    // private commentsRepository: Repository<CommentsEntity>,
  ) {}

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

  async getBookRepository(id: number): Promise<BookEntity> {
    return this.booksRepository.findOneBy({ id: id });
  }

  async getAllBooksRepository(): Promise<BookEntity[]> {
    const aa = await this.booksRepository.findAndCount({
      take: 2,
      relations: [
        'author',
        'bookGenres',
        'bookGenres.genre',
        'cover',
        // 'comments',
        // 'rates',
      ],
    });
    return this.booksRepository.find({
      relations: [
        'author',
        'bookGenres',
        'bookGenres.genre',
        'cover',
        // 'comments',
        // 'rates',
      ],
    });
  }

  async findAllPaginatedRepository(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.booksRepository.createQueryBuilder('book');

    queryBuilder
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.bookGenres', 'bookGenre')
      .leftJoinAndSelect('bookGenre.genre', 'genre')
      .leftJoinAndSelect('book.cover', 'cover');
    // .leftJoinAndSelect('book.comments', 'comments')
    // .leftJoinAndSelect('book.rates', 'rates')

    if (pageOptionsDto.genres && pageOptionsDto.genres.length > 0) {
      queryBuilder.andWhere(
        'book.id IN (SELECT book.id FROM book_to_genre_entity bookGenre WHERE bookGenre.genreId IN (:...genres))',
        { genres: pageOptionsDto.genres },
      );
    }

    if (pageOptionsDto.minPrice !== undefined) {
      queryBuilder.andWhere(
        '(CASE WHEN cover.hardcover_amount > 0 THEN cover.hardcover_price ELSE cover.paperback_price END) >= :minPrice',
        {
          minPrice: pageOptionsDto.minPrice,
        },
      );
    }

    if (pageOptionsDto.maxPrice !== undefined) {
      queryBuilder.andWhere(
        '(CASE WHEN cover.hardcover_amount > 0 THEN cover.hardcover_price ELSE cover.paperback_price END)  <= :maxPrice',
        {
          maxPrice: pageOptionsDto.maxPrice,
        },
      );
    }

    queryBuilder.addSelect(
      'CASE WHEN cover.hardcover_amount > 0 THEN cover.hardcover_price ELSE cover.paperback_price END',
      'sort_field_price',
    );

    let sortField: string;

    switch (pageOptionsDto.sortBy) {
      case 'Price':
        sortField = 'sort_field_price';
        break;
      case 'Name':
        sortField = 'book.name';
        break;
      case 'Author name':
        sortField = 'author.text';
        break;
      case 'Rating':
        sortField = 'book.name';
        break;
      case 'Date of issue':
        sortField = 'book.dateOfIssue';
        break;
      default:
        sortField = 'book.name';
    }

    queryBuilder
      .orderBy(sortField, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async updateBookCoverRepository(
    filename: string,
    bookId: number,
  ): Promise<BookEntity> {
    const book = await this.booksRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new Error('Book not found');
    }
    book.img = filename;
    return await this.booksRepository.save(book);
  }

  // async createCommentRepository(
  //   comment: CreateCommentDto,
  // ): Promise<CommentsEntity> {
  //   const newComment = this.commentsRepository.create(comment);
  //   return this.commentsRepository.save(newComment);
  // }
}
