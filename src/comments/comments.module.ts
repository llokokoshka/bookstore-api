import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsEntity } from './entity/comments.entity';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';
import { CommentsRepository } from './comments.repository';
import { JwtModule } from '@nestjs/jwt';
import { CreateTokensUtil } from 'src/auth/utils/token.utils';
import { UserRepository } from 'src/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsEntity]),
    JwtModule.register({
      global: true,
    }),
    UsersModule,
    BooksModule,
  ],
  providers: [
    CommentsService,
    CommentsRepository,
    CreateTokensUtil,
    UserRepository,
  ],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
