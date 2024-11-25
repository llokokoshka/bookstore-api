import { Module } from '@nestjs/common';

import { UsersModule } from 'src/modules/users/users.module';
import { FilesController } from './files.controller';
import { UsersService } from 'src/modules/users/users.service';
import { UserRepository } from 'src/modules/users/users.repository';
import { BooksService } from 'src/modules/books/books.service';
import { BooksModule } from 'src/modules/books/books.module';

@Module({
  imports: [UsersModule, BooksModule],
  controllers: [FilesController],
  providers: [UsersService, UserRepository, BooksService],
})
export class FilesModule {}
