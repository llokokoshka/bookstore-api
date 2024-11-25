import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CartEntity } from './entity/cart.entity';
import { BookEntity } from 'src/modules/books/entity/books.entity';
import { UserEntity } from 'src/modules/users/entity/users.entity';
import { CartItemEntity } from './entity/cartItem.entity';
import { checkBookAmount } from './utils/cart.utils';

@Injectable()
export class CartRepository {
  repository: Repository<unknown>;
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
  ) {}

  async getCartRepository(User: UserEntity): Promise<CartEntity> {
    let totalPrice = 0;
    let cart = await this.cartRepository.findOne({
      where: { user: { id: User.id } },
      relations: ['cartItems', 'cartItems.book', 'cartItems.book.author'],
    });
    if (!cart) {
      const newUserCart = this.cartRepository.create({
        total_price: 0,
        user: User,
      });
      cart = await this.cartRepository.save(newUserCart);
    }

    const finallyCart = cart.cartItems?.map((item) => {
      return item.total_price;
    });

    finallyCart?.forEach(function (num) {
      totalPrice += num;
    });
    if (totalPrice !== 0) {
      cart.total_price = totalPrice;
      cart = await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addItemInCartRepository(book: BookEntity, User: UserEntity) {
    let cartItemRec: CartItemEntity;

    const cart = await this.cartRepository.findOne({
      where: { user: { id: User.id } },
      relations: ['cartItems', 'cartItems.book', 'cartItems.book.author'],
    });

    const isHardCover = checkBookAmount(book);

    let price: number;

    if (isHardCover) {
      price = book.cover.hardcover_price;
    } else price = book.cover.paperback_price;

    const quantity = 1;

    const totalPrice = price;
    const dataForItem = { total_price: totalPrice, quantity, book, cart };
    cartItemRec = this.cartItemRepository.create(dataForItem);
    return this.cartItemRepository.save(cartItemRec);
  }

  async upBookAmountRepository(ItemId: number) {
    const bookInCart = await this.cartItemRepository.findOne({
      where: { id: ItemId },
      relations: ['book', 'book.author'],
    });
    const book = bookInCart.book;
    const isHardCover = checkBookAmount(book);

    if (bookInCart) {
      if (isHardCover && book.cover.hardcover_amount > bookInCart.quantity) {
        bookInCart.quantity += 1;
        bookInCart.total_price += book.cover.hardcover_price;
        book.cover.hardcover_amount -= 1;
      } else if (
        !isHardCover &&
        book.cover.paperback_amount > bookInCart.quantity
      ) {
        bookInCart.quantity += 1;
        bookInCart.total_price += book.cover.paperback_price;
        book.cover.paperback_amount -= 1;
      }
      return this.cartItemRepository.save(bookInCart);
    }
  }

  async downBookAmountRepository(ItemId: number) {
    const bookInCart = await this.cartItemRepository.findOne({
      where: { id: ItemId },
      relations: ['book', 'book.author'],
    });
    const book = bookInCart.book;
    const isHardCover = checkBookAmount(book);

    if (bookInCart) {
      if (isHardCover) {
        bookInCart.quantity -= 1;
        bookInCart.total_price -= book.cover.hardcover_price;
        book.cover.hardcover_amount += 1;
      } else {
        bookInCart.quantity -= 1;
        bookInCart.total_price -= book.cover.paperback_price;
        book.cover.paperback_amount += 1;
      }
      return this.cartItemRepository.save(bookInCart);
    }
  }

  async deleteItemFromCartRepository(ItemId: number) {
    const bookInCart = await this.cartItemRepository.findOneBy({ id: ItemId });
    await this.cartItemRepository.remove(bookInCart);
    return ItemId;
  }
}
