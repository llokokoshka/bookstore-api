import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { dbConfig } from './db/dataSource';
import { UserRepository } from './users/users.repository';
import { AuthGuard } from './auth/auth.guard';
import { loadConfig } from './config/configuration';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { BooksModule } from './books/books.module';
import { BooksController } from './books/books.controller';
import { FilesController } from './files/files.controller';
import { CreateTokensUtil } from './auth/utils/token.utils';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [loadConfig] }),
    UsersModule,
    MulterModule.register({
      dest: './uploads',
    }),
    BooksModule,
    FilesModule,
  ],
  controllers: [
    AppController,
    UsersController,
    // BooksController,
    // FilesController,
  ],
  providers: [
    AppService,
    UserRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CreateTokensUtil,
  ],
})
export class AppModule {}
