import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { Book } from 'src/books/entity/books.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.favorites)
  // user: User;

  // @ManyToOne(() => Book, (book) => book.favorites)
  // book: Book;
}
