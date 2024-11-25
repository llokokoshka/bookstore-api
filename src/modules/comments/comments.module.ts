import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsEntity } from './entity/comments.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { BooksModule } from 'src/modules/books/books.module';
import { CommentsRepository } from './comments.repository';
import { CreateTokensUtil } from 'src/modules/auth/utils/token.utils';
import { UserRepository } from 'src/modules/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsEntity]),
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
