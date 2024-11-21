import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { BookEntity } from '../../books/entity/books.entity';
import { CartEntity } from './cart.entity';

@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  total_price: number;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => BookEntity, (book) => book.cartItems)
  book: BookEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItems)
  cart: CartEntity;
}
