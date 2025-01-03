import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

import { CartEntity } from './entity/cart.entity';
import { BookEntity } from '../books/entity/books.entity';
import { UserEntity } from '../users/entity/users.entity';
import { CartItemEntity } from './entity/cartItem.entity';
import { CartUtil } from './utils/cart.utils';

@Injectable()
export class CartRepository {
  repository: Repository<unknown>;
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,

    private cartUtil: CartUtil,
  ) {}

  async getCartRepository(User: UserEntity): Promise<CartEntity> {
    let totalPrice = 0;
    let cart = await this.cartRepository.findOne({
      where: { user: { id: User.id } },
      relations: [
        'cartItems',
        'cartItems.book',
        'cartItems.book.author',
        'cartItems.book.rates',
      ],
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
    cart.cartItems.map((cartItem) => {
      !cartItem.book.img.includes(`http://localhost:4000/uploads/books/`)
        ? (cartItem.book.img = `http://localhost:4000/uploads/books/${cartItem.book.img}`)
        : cartItem.book.img;
    });
    return cart;
  }

  async addItemInCartRepository(
    book: BookEntity,
    User: UserEntity,
  ): Promise<DeepPartial<CartItemEntity>> {
    let cartItemRec: CartItemEntity;

    const cart = await this.cartRepository.findOne({
      where: { user: { id: User.id } },
      relations: [
        'cartItems',
        'cartItems.book',
        'cartItems.book.author',
        'cartItems.book.rates',
      ],
    });

    const isHardCover = this.cartUtil.checkBookAmount(book);

    let price: number;

    if (isHardCover) {
      price = book.cover.hardcover_price;
    } else price = book.cover.paperback_price;

    const quantity = 1;

    const totalPrice = price;
    cart.total_price += totalPrice;
    this.cartRepository.save(cart);
    const dataForItem = { total_price: totalPrice, quantity, book, cart };
    cartItemRec = this.cartItemRepository.create(dataForItem);
    return this.cartItemRepository.save(cartItemRec);
  }

  async upBookAmountRepository(userId: number, ItemId: number) {
    const bookInCart = await this.cartItemRepository.findOne({
      where: { id: ItemId },
      relations: ['book', 'book.author'],
    });
    const book = bookInCart.book;
    const isHardCover = this.cartUtil.checkBookAmount(book);
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: [
        'cartItems',
        'cartItems.book',
        'cartItems.book.author',
        'cartItems.book.rates',
      ],
    });

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

  async downBookAmountRepository(userId: number, ItemId: number) {
    const bookInCart = await this.cartItemRepository.findOne({
      where: { id: ItemId },
      relations: ['book', 'book.author'],
    });
    const book = bookInCart.book;
    const isHardCover = this.cartUtil.checkBookAmount(book);
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: [
        'cartItems',
        'cartItems.book',
        'cartItems.book.author',
        'cartItems.book.rates',
      ],
    });

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

  async deleteItemFromCartRepository(userId: number, ItemId: number) {
    const bookInCart = await this.cartItemRepository.findOneBy({ id: ItemId });
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: [
        'cartItems',
        'cartItems.book',
        'cartItems.book.author',
        'cartItems.book.rates',
      ],
    });
    cart.total_price -= bookInCart.total_price;
    await this.cartItemRepository.remove(bookInCart);
    await this.cartRepository.save(cart);
    return ItemId;
  }
}
