import { Injectable } from '@nestjs/common';

import { CartRepository } from './cart.repository';
import { CartEntity } from './entity/cart.entity';
import { BookEntity } from 'src/modules/books/entity/books.entity';
import { UserEntity } from 'src/modules/users/entity/users.entity';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async getCartService(user: UserEntity): Promise<CartEntity> {
    return this.cartRepository.getCartRepository(user);
  }

  async addItemInCartService(book: BookEntity, user: UserEntity) {
    return this.cartRepository.addItemInCartRepository(book, user);
  }
  async upBookAmountSrvice(ItemId: number) {
    return this.cartRepository.upBookAmountRepository(ItemId);
  }
  async downBookAmountSrvice(ItemId: number) {
    return this.cartRepository.downBookAmountRepository(ItemId);
  }

  async deleteItemFromCartSrvice(ItemId: number) {
    return this.cartRepository.deleteItemFromCartRepository(ItemId);
  }
}
