import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { BookEntity } from '../../books/entity/books.entity';
import { FavoritesEntity } from './favorites.entity';

@Entity()
export class FavoritesItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity, (book) => book.favoritesItems)
  book: BookEntity;

  @ManyToOne(() => FavoritesEntity, (favorite) => favorite.favoritesItems)
  favorite: FavoritesEntity;
}
