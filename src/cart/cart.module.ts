import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entity/cart.entity';
import { CartItemEntity } from './entity/cartItem.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';
import { CartRepository } from './cart.repository';
import { CreateTokensUtil } from 'src/auth/utils/token.utils';
import { UserRepository } from 'src/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    JwtModule.register({
      global: true,
    }),
    UsersModule,
    BooksModule,
  ],
  providers: [CartService, CartRepository, CreateTokensUtil, UserRepository],
  controllers: [CartController],
})
export class CartModule {}
