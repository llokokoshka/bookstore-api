import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { BookEntity } from '../../books/entity/books.entity';
import { GenreEntity } from './genre.entity';

@Entity()
export class BookToGenreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity, (book) => book.bookGenres)
  book: BookEntity;

  @ManyToOne(() => GenreEntity, (genre) => genre.bookGenres)
  genre: GenreEntity;
}
