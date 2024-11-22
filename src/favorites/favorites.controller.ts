import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { BooksService } from '../books/books.service';
import { BookIdDTO } from '../cart/lib/ItemsCart.dto';
import { ReqGetUserDto } from '../users/lib/reqGetUser.dto';
import { UsersService } from '../users/users.service';
import { FavoritesService } from './favorites.service';
import { FavoritesEntity } from './entity/favorites.entity';

@UseGuards(AuthGuard)
@Controller('user/favorites')
export class FavoritesController {
  constructor(
    private favService: FavoritesService,
    private bookService: BooksService,
    private userService: UsersService,
  ) {}

  @Get()
  async getFav(@Req() req: ReqGetUserDto): Promise<FavoritesEntity> {
    const user = req.user;
    return this.favService.getFavService(user);
  }

  @Post('item')
  async addItemInCart(@Req() req: ReqGetUserDto, @Body() dto: BookIdDTO) {
    const user = await this.userService.getUserForServer(req.user.id);
    const book = await this.bookService.getBookService(dto.bookId);
    return this.favService.addItemInFavService(book, user);
  }

  @Delete(':itemId')
  async deleteItemFromCart(@Param('itemId') itemId: number) {
    return this.favService.deleteItemFromFavSrvice(itemId);
  }
}
