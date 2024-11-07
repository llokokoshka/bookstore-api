import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { BookEntity } from '../../books/entity/books.entity';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
