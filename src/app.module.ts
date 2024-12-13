import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { loadConfig } from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CreateTokensUtil } from './modules/auth/utils/token.utils';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { UserRepository } from './modules/users/users.repository';
import { dbConfig } from './db/dataSource';
import { FilesModule } from './modules/files/files.module';
import { BooksModule } from './modules/books/books.module';
import { GenresModule } from './modules/genres/genres.module';
import { CartModule } from './modules/cart/cart.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot({ isGlobal: true, load: [loadConfig] }),
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    FilesModule,
    GenresModule,
    CartModule,
    FavoritesModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UserRepository, CreateTokensUtil],
})
export class AppModule {}
