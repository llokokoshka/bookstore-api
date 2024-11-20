import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { BookEntity } from '../../books/entity/books.entity';
import { UserEntity } from '../../users/entity/users.entity';

@Entity()
export class RateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @ManyToOne(() => UserEntity, (user) => user.rates)
    user: UserEntity;

    @ManyToOne(() => BookEntity, (book) => book.rates)
    book: BookEntity;
}
