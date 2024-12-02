import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../../users/entity/users.entity';
import { CartItemEntity } from './cartItem.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  total_price: number;

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  cartItems: CartItemEntity[];
}
