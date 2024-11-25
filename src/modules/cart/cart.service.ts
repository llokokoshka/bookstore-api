import { Injectable, Logger } from '@nestjs/common';

import { CartRepository } from './cart.repository';
import { CartEntity } from './entity/cart.entity';
import { BookEntity } from 'src/modules/books/entity/books.entity';
import { UserEntity } from 'src/modules/users/entity/users.entity';

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

  async addItemInCartService(book: BookEntity, user: UserEntity) {
    try {
      return this.cartRepository.addItemInCartRepository(book, user);
    } catch (err) {
      this.logger.error(err);
    }
  }
  async upBookAmountSrvice(ItemId: number) {
    try {
      return this.cartRepository.upBookAmountRepository(ItemId);
    } catch (err) {
      this.logger.error(err);
    }
  }
  async downBookAmountSrvice(ItemId: number) {
    try {
      return this.cartRepository.downBookAmountRepository(ItemId);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async deleteItemFromCartSrvice(ItemId: number) {
    try {
      return this.cartRepository.deleteItemFromCartRepository(ItemId);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
