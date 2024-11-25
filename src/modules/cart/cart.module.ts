import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartEntity } from './entity/cart.entity';
import { CartItemEntity } from './entity/cartItem.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { BooksModule } from 'src/modules/books/books.module';
import { CartRepository } from './cart.repository';
import { CreateTokensUtil } from 'src/modules/auth/utils/token.utils';
import { UserRepository } from 'src/modules/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    UsersModule,
    BooksModule,
  ],
  providers: [CartService, CartRepository, CreateTokensUtil, UserRepository],
  controllers: [CartController],
})
export class CartModule {}
