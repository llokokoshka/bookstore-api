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
    return this.cartService.addItemInCartService(book, user);
  }

  @Patch('item/:itemId')
  async upBookAmount(@Param('itemId') itemId: number, @Body() ation: boolean) {
    if (ation) {
      return this.cartService.upBookAmountSrvice(itemId);
    } else {
      return this.cartService.downBookAmountSrvice(itemId);
    }
  }

  @Delete('item/:itemId')
  async deleteItemFromCart(@Param('itemId') itemId: number) {
    return this.cartService.deleteItemFromCartSrvice(itemId);
  }
}
