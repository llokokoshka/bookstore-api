import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

import { BookEntity } from './entity/books.entity';
import { CreateBookDto } from './lib/createBook.dto';
import { CreateGenreDto } from './lib/createGenre.dto';
import { GenreEntity } from './entity/genre.entity';
import { BookToGenreEntity } from './entity/bookGenre.entity';
import { CreateAuthorDto } from './lib/createAuthor.dto';
import { AuthorEntity } from './entity/author.entity';
import { CommentsEntity } from 'src/users/entity/comments.entity';
import { CreateCommentDto } from 'src/users/lib/createComment.dto';
// import { BooksFilterDTO } from './lib/booksFilter.dto';
// import { PageService } from './page.service';
import { PageMetaDto } from './lib/page-meta.dto';
import { PageDto } from './lib/page.dto';
import { PageOptionsDto } from './lib/dtos';

@Injectable()
export class BooksRepository{
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

  async findAllPaginatedRepository(pageOptionsDto: PageOptionsDto){
    // const where: any = {};

    // if (filter.author) {
    //   where.author = ILike(`%${filter.author}%`);
    // }
    
    // if (filter.genres && filter.genres.length > 0) {
    //   where.genres = { id: In(filter.genres) };
    // }
    
    // if (filter.minPrice || filter.maxPrice) {
    //   where.price = {};
    //   if (filter.minPrice) where.price['$gte'] = filter.minPrice;
    //   if (filter.maxPrice) where.price['$lte'] = filter.maxPrice;
    // }
  
    // return await this.paginate(this.booksRepository, filter, where);
    const queryBuilder = this.booksRepository.createQueryBuilder("book");

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
