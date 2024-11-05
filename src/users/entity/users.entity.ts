import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Comments } from './comments.entity';
import { Favorite } from './favorite.entity';
import { Rate } from './rate.entity';

@Entity()
export class User {
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

  // @OneToOne(() => Cart)
  // @JoinColumn()
  // cart: Cart

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  // @OneToMany(() => Favorite, (favorite) => favorite.user)
  // favorites: Favorite[];

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];
}
