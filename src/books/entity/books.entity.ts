import { CommentsEntity } from '../../users/entity/comments.entity';
import { RateEntity } from '../../users/entity/rate.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AuthorEntity } from './author.entity';
import { BookGenreEntity } from './bookGenre.entity';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  quantity: number;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @OneToMany(() => BookGenreEntity, (bookGenre) => bookGenre.book)
  bookGenres: BookGenreEntity[];

  @OneToMany(() => CommentsEntity, (comment) => comment.book)
  comments: CommentsEntity[];

  @OneToMany(() => RateEntity, (rate) => rate.book)
  rates: RateEntity[];
}
