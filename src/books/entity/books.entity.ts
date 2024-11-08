import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { CommentsEntity } from '../../users/entity/comments.entity';
import { RateEntity } from '../../users/entity/rate.entity';
import { AuthorEntity } from './author.entity';
import { BookToGenreEntity } from './bookGenre.entity';
import { CoverEntity } from './covers.entity';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column({ default: false })
  isBestseller: boolean;

  @Column({ default: false })
  isNew: boolean;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @OneToMany(() => BookToGenreEntity, (bookGenre) => bookGenre.book)
  bookGenres: BookToGenreEntity[];

  @OneToMany(() => CommentsEntity, (comment) => comment.book)
  comments: CommentsEntity[];

  @OneToMany(() => RateEntity, (rate) => rate.book)
  rates: RateEntity[];

  @OneToMany(() => CoverEntity, (cover) => cover.book)
  covers: CoverEntity[];
}
