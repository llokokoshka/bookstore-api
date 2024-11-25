import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { BookEntity } from './books.entity';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  text: string;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
