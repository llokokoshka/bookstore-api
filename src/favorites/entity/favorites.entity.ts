import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../../users/entity/users.entity';
import { FavoritesItemEntity } from './favoritesItem.entity';

@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.favorite)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(
    () => FavoritesItemEntity,
    (favoritesItem) => favoritesItem.favorite,
  )
  favoritesItems: FavoritesItemEntity[];
}
