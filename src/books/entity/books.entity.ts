import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { AuthorEntity } from './author.entity';
import { BookToGenreEntity } from './bookGenre.entity';
import { CoverEntity } from './covers.entity';
import { CommentsEntity } from '../../comments/entity/comments.entity';
// import { RateEntity } from '../../users/entity/rate.entity';

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

  @Column({ default: false })
  isBestseller: boolean;

  @Column({ default: false })
  isNew: boolean;

  @Column({ type: 'date', default: '1800-01-01' })
  dateOfIssue: Date;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @OneToMany(() => BookToGenreEntity, (bookGenre) => bookGenre.book)
  bookGenres: BookToGenreEntity[];

  @OneToOne(() => CoverEntity, { cascade: true, eager: true })
  @JoinColumn()
  cover: CoverEntity;

  @OneToMany(() => CommentsEntity, (comment) => comment.book)
  comments: CommentsEntity[];

  // @OneToMany(() => RateEntity, (rate) => rate.book)
  // rates: RateEntity[];
}
