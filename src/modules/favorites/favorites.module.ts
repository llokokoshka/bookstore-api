import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesEntity } from './entity/favorites.entity';
import { FavoritesItemEntity } from './entity/favoritesItem.entity';
import { UsersModule } from '../users/users.module';
import { BooksModule } from '../books/books.module';
import { FavoriteRepository } from './favorites.repository';
import { CreateTokensUtil } from '../auth/utils/token.utils';
import { UserRepository } from '../users/users.repository';
import { AuthUtils } from '../auth/utils/auth.utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity, FavoritesItemEntity]),
    UsersModule,
    BooksModule,
  ],
  providers: [
    FavoritesService,
    FavoriteRepository,
    CreateTokensUtil,
    UserRepository,
    AuthUtils,
  ],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
