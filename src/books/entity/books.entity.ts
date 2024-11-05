import { Comments } from 'src/users/entity/comments.entity';
import { Favorite } from 'src/users/entity/favorite.entity';
import { Rate } from 'src/users/entity/rate.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Author } from './author.entity';
import { BookGenre } from './bookGenre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.book)
  bookGenres: BookGenre[];

  @OneToMany(() => Comments, (comment) => comment.book)
  comments: Comments[];

  // @OneToMany(() => Favorite, (favorite) => favorite.book)
  // favorites: Favorite[];

  @OneToMany(() => Rate, (rate) => rate.book)
  rates: Rate[];
}
