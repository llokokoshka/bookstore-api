import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { BookEntity } from './books.entity';
import { GenreEntity } from './genre.entity';

@Entity('book_to_genre_entity')
export class BookToGenreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity, (book) => book.bookGenres)
  book: BookEntity;

  @ManyToOne(() => GenreEntity, (genre) => genre.bookGenres)
  genre: GenreEntity;
}
