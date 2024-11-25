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

  async getFavRepository(User: UserEntity): Promise<FavoritesEntity> {
    let fav = await this.favRepository.findOne({
      where: { user: { id: User.id } },
      relations: [
        'favoritesItems',
        'favoritesItems.book',
        'favoritesItems.book.author',
      ],
    });
    if (!fav) {
      const newUserFav = this.favRepository.create({
        user: User,
      });
      fav = await this.favRepository.save(newUserFav);
    }

    return fav;
  }

  async addItemInFavRepository(book: BookEntity, User: UserEntity) {
    let favItemRec: FavoritesItemEntity;
    const fav = await this.favRepository.findOne({
      where: { user: { id: User.id } },
      relations: [
        'favoritesItems',
        'favoritesItems.book',
        'favoritesItems.book.author',
      ],
    });
    const dataForItem = { book, favorite: fav };
    favItemRec = this.favItemRepository.create(dataForItem);
    const newFav = await this.favItemRepository.save(favItemRec);
    return newFav;
  }

  async deleteItemFromFavRepository(ItemId: number) {
    const bookInFav = await this.favItemRepository.findOneBy({ id: ItemId });
    await this.favItemRepository.remove(bookInFav);
    return ItemId;
  }
}
