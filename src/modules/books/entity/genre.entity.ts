import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { BookToGenreEntity } from './bookGenre.entity';

@Entity()
export class GenreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => BookToGenreEntity, (bookGenre) => bookGenre.genre)
  bookGenres: BookToGenreEntity[];
}
