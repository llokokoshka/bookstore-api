import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { BookEntity } from './books.entity';

export enum CoverType {
  PAPERBACK = 'Paperback',
  HARDCOVER = 'Hardcover',
}

@Entity()
export class CoverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  price: number;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: CoverType })
  coverTypes: CoverType;

  @ManyToOne(() => BookEntity, (book) => book.covers)
  book: BookEntity;
}
