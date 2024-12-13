import { Injectable, Logger } from '@nestjs/common';

import { CartRepository } from './cart.repository';
import { CartEntity } from './entity/cart.entity';
import { BookEntity } from 'src/modules/books/entity/books.entity';
import { UserEntity } from 'src/modules/users/entity/users.entity';
import { CartItemEntity } from './entity/cartItem.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  constructor(private cartRepository: CartRepository) {}

  async getCartService(user: UserEntity): Promise<CartEntity> {
    try {
      return this.cartRepository.getCartRepository(user);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async addItemInCartService(
    book: BookEntity,
    user: UserEntity,
  ): Promise<DeepPartial<CartItemEntity>> {
    try {
      return this.cartRepository.addItemInCartRepository(book, user);
    } catch (err) {
      this.logger.error(err);
    }
  }
  async upBookAmountSrvice(userId: number, ItemId: number) {
    try {
      return this.cartRepository.upBookAmountRepository(userId, ItemId);
    } catch (err) {
      this.logger.error(err);
    }
  }
  async downBookAmountSrvice(userId: number, ItemId: number) {
    try {
      return this.cartRepository.downBookAmountRepository(userId, ItemId);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async deleteItemFromCartSrvice(userId: number, ItemId: number) {
    try {
      return this.cartRepository.deleteItemFromCartRepository(userId, ItemId);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
