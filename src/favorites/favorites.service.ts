import { Injectable } from '@nestjs/common';

import { BookEntity } from '../books/entity/books.entity';
import { UserEntity } from '../users/entity/users.entity';
import { FavoriteRepository } from './favorites.repository';
import { FavoritesEntity } from './entity/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(private favRepository: FavoriteRepository) {}

  async getFavService(user: UserEntity): Promise<FavoritesEntity> {
    return this.favRepository.getFavRepository(user);
  }

  async addItemInFavService(book: BookEntity, user: UserEntity) {
    return this.favRepository.addItemInFavRepository(book, user);
  }

  async deleteItemFromFavSrvice(ItemId: number) {
    return this.favRepository.deleteItemFromFavRepository(ItemId);
  }
}
