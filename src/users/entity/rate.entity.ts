import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { Book } from 'src/books/entity/books.entity';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rates)
  user: User;

  @ManyToOne(() => Book, (book) => book.rates)
  book: Book;
}
