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
import { BookEntity } from '../books/entity/books.entity';

@UseGuards(AuthGuard)
@Controller('user/favorites')
export class FavoritesController {
  constructor(
    private favService: FavoritesService,
    private bookService: BooksService,
    private userService: UsersService,
  ) {}

  @Get()
  async getFav(@Req() req: ReqGetUserDto): Promise<{
    id: number;
    booksIdsInFavorites: number[];
    favoriteBooks: BookEntity[];
  }> {
    const user = req.user;
    return this.favService.getFavService(user);
  }

  @Post('item')
  async addItemInCart(@Req() req: ReqGetUserDto, @Body() dto: BookIdDTO) {
    const user = await this.userService.getUserForServer(req.user.id);
    const book = await this.bookService.getBookService(dto.bookId);
    const fav = await this.favService.addItemInFavService(book, user);
    return fav;
  }

  @Delete('item/:bookId')
  async deleteItemFromCart(
    @Req() req: ReqGetUserDto,
    @Param('bookId') bookId: number,
  ) {
    const user = await this.userService.getUserForServer(req.user.id);
    return this.favService.deleteItemFromFavSrvice(bookId, user);
  }
}
