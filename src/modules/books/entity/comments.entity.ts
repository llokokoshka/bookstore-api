import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entity/users.entity';
import { BookEntity } from '../../books/entity/books.entity';

@Entity()
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  dateOfCreate: Date;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.comments)
  book: BookEntity;
}
