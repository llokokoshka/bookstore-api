import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { BookEntity } from '../books/entity/books.entity';
import { UserEntity } from '../users/entity/users.entity';
import { FavoriteRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);
  constructor(private favRepository: FavoriteRepository) {}

  async getFavService(user: UserEntity): Promise<{
    id: number;
    booksIdsInFavorites: number[];
    favoriteBooks: BookEntity[];
  }> {
    try {
      return this.favRepository.getFavRepository(user);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Unable get favorites', HttpStatus.NOT_FOUND);
    }
  }

  async addItemInFavService(book: BookEntity, user: UserEntity) {
    try {
      return this.favRepository.addItemInFavRepository(book, user);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Unable add item in favorite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteItemFromFavSrvice(BookId: number, user: UserEntity) {
    try {
      return this.favRepository.deleteItemFromFavRepository(BookId, user);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Unable delete item in favorite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
