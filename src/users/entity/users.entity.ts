import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { CommentsEntity } from '../../comments/entity/comments.entity';
import { RateEntity } from '../../books/entity/rate.entity';
import { CartEntity } from '../../cart/entity/cart.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @OneToMany(() => CommentsEntity, (comment) => comment.user)
  comments: CommentsEntity[];

  @OneToMany(() => RateEntity, (rate) => rate.user)
  rates: RateEntity[];

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity;
}
