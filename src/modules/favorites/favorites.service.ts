import { Injectable, Logger } from '@nestjs/common';

import { BookEntity } from '../books/entity/books.entity';
import { UserEntity } from '../users/entity/users.entity';
import { FavoriteRepository } from './favorites.repository';
import { FavoritesEntity } from './entity/favorites.entity';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);
  constructor(private favRepository: FavoriteRepository) {}

  async getFavService(user: UserEntity): Promise<FavoritesEntity> {
    try {
      return this.favRepository.getFavRepository(user);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async addItemInFavService(book: BookEntity, user: UserEntity) {
    try {
      return this.favRepository.addItemInFavRepository(book, user);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async deleteItemFromFavSrvice(ItemId: number) {
    try {
      return this.favRepository.deleteItemFromFavRepository(ItemId);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
