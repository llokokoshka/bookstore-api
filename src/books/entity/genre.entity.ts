import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookGenreEntity } from './bookGenre.entity';

@Entity()
export class GenreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BookGenreEntity, (bookGenre) => bookGenre.genre)
  bookGenres: BookGenreEntity[];
}
