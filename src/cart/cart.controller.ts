import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { CartService } from './cart.service';
import { ReqGetUserDto } from 'src/users/lib/reqGetUser.dto';
import { CartEntity } from './entity/cart.entity';
import { BookIdDTO } from './lib/ItemsCart.dto';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';

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

  @Patch(':ItemId/plus')
  async upBookAmount(@Param('ItemId') ItemId: number) {
    return this.cartService.upBookAmountSrvice(ItemId);
  }

  @Patch(':ItemId/minus')
  async downBookAmount(@Param('ItemId') ItemId: number) {
    return this.cartService.downBookAmountSrvice(ItemId);
  }
}
