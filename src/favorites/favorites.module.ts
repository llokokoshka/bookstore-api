import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './entity/favorites.entity';
import { FavoritesItemEntity } from './entity/favoritesItem.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity, FavoritesItemEntity]),
    JwtModule.register({
      global: true,
    }),
    UsersModule,
    BooksModule,
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
