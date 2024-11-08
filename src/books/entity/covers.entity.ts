import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { BookToGenreEntity } from './bookGenre.entity';
import { BookEntity } from './books.entity';
import { CoverTypeEntity } from './coverType.entity';

@Entity()
export class CoverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  price: number;

  @ManyToOne(() => BookEntity, (book) => book.covers)
  book: BookEntity;

  @OneToMany(() => CoverTypeEntity, (coverType) => coverType.cover)
  coverTypes: CoverTypeEntity[];
}
