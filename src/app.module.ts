import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { loadConfig } from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CreateTokensUtil } from './auth/utils/token.utils';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UserRepository } from './users/users.repository';
import { dbConfig } from './db/dataSource';
import { FilesModule } from './files/files.module';
import { BooksModule } from './books/books.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot({ isGlobal: true, load: [loadConfig] }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    FilesModule,
    GenresModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    UserRepository,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    CreateTokensUtil,
  ],
})
export class AppModule {}
