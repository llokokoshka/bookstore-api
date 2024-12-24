import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BookEntity } from '../books/entity/books.entity';
import { UserEntity } from '../users/entity/users.entity';
import { FavoritesEntity } from './entity/favorites.entity';
import { FavoritesItemEntity } from './entity/favoritesItem.entity';

@Injectable()
export class FavoriteRepository {
  repository: Repository<unknown>;
  constructor(
    @InjectRepository(FavoritesEntity)
    private favRepository: Repository<FavoritesEntity>,

    @InjectRepository(FavoritesItemEntity)
    private favItemRepository: Repository<FavoritesItemEntity>,
  ) {}

  async getFavRepository(
    User: UserEntity,
  ): Promise<{ id: number; booksIdsInFavorites: number[] }> {
    let fav = await this.favRepository.findOne({
      where: { user: { id: User.id } },
      relations: [
        'favoritesItems',
        'favoritesItems.book',
        'favoritesItems.book.author',
        'favoritesItems.book.rates',
      ],
    });
    if (!fav) {
      const newUserFav = this.favRepository.create({
        user: User,
      });
      fav = await this.favRepository.save(newUserFav);
    }
    const arr = fav.favoritesItems?.map((item) => item.book.id);
    const correctFormOfFav = {
      id: fav.id,
      booksIdsInFavorites: arr || [],
    };
    return correctFormOfFav;
  }

  async addItemInFavRepository(book: BookEntity, User: UserEntity) {
    let favItemRec: FavoritesItemEntity;
    let fav = await this.favRepository.findOne({
      where: { user: { id: User.id } },
      relations: [
        'favoritesItems',
        'favoritesItems.book',
        'favoritesItems.book.author',
        'favoritesItems.book.rates',
      ],
    });
    if (!fav) {
      const newUserFav = this.favRepository.create({
        user: User,
      });
      fav = await this.favRepository.save(newUserFav);
    }
    const bookInFav = await this.favRepository.findOne({
      where: { favoritesItems: { book: { id: book.id } } },
    });
    if (bookInFav) {
      const newFav = await this.getFavRepository(User);
      return newFav;
    }
    const dataForItem = { book, favorite: fav };
    favItemRec = this.favItemRepository.create(dataForItem);
    await this.favItemRepository.save(favItemRec);
    const newFav = await this.getFavRepository(User);
    return newFav;
  }

  async deleteItemFromFavRepository(BookId: number, User: UserEntity) {
    const bookInFav = await this.favItemRepository.findOne({
      where: { book: { id: BookId } },
    });
    const a = await this.favItemRepository.remove(bookInFav);
    await this.favItemRepository.save(a);

    const fav = await this.getFavRepository(User);
    return fav;
  }
}
