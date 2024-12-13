import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { FilesController } from './files.controller';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { BooksService } from '../books/books.service';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [UsersModule, BooksModule],
  controllers: [FilesController],
  providers: [UsersService, UserRepository, BooksService],
})
export class FilesModule {}
