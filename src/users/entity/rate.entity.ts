import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './users.entity';
import { BookEntity } from '../../books/entity/books.entity';

@Entity()
export class RateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.rates)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.rates)
  book: BookEntity;
}
