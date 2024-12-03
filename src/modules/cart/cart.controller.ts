import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { CartService } from './cart.service';
import { ReqGetUserDto } from 'src/modules/users/lib/reqGetUser.dto';
import { CartEntity } from './entity/cart.entity';
import { BookIdDTO } from './lib/ItemsCart.dto';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { DeepPartial } from 'typeorm';
import { CartItemEntity } from './entity/cartItem.entity';

@UseGuards(AuthGuard)
@Controller('user/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private bookService: BooksService,
    private userService: UsersService,
  ) {}

  @Get()
  async getCart(@Req() req: ReqGetUserDto): Promise<CartEntity> {
    const user = req.user;
    return this.cartService.getCartService(user);
  }

  @Post('item')
  async addItemInCart(@Req() req: ReqGetUserDto, @Body() dto: BookIdDTO) {
    const user = await this.userService.getUserForServer(req.user.id);
    const book = await this.bookService.getBookService(dto.bookId);
    const cartItem = await this.cartService.addItemInCartService(book, user);
    const correctFormOfCartData = {
      id: cartItem.id,
      total_price: cartItem.total_price,
      quantity: cartItem.quantity,
      book: cartItem.book,
    };
    return correctFormOfCartData;
  }

  @Patch('item/:itemId')
  async changeBookAmount(
    @Req() req: ReqGetUserDto,
    @Param('itemId') itemId: number,
    @Body() cahngeAction: { action: boolean },
  ) {
    if (cahngeAction.action) {
      return this.cartService.upBookAmountSrvice(req.user.id, itemId);
    } else {
      return this.cartService.downBookAmountSrvice(req.user.id, itemId);
    }
  }

  @Delete('item/:itemId')
  async deleteItemFromCart(
    @Req() req: ReqGetUserDto,
    @Param('itemId') itemId: number,
  ) {
    return this.cartService.deleteItemFromCartSrvice(req.user.id, itemId);
  }
}
