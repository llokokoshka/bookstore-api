import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';
import { FilesController } from './files.controller';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/users.repository';
import { BooksService } from 'src/books/books.service';
import { BooksModule } from 'src/books/books.module';
import { BooksRepository } from 'src/books/books.repository';

@Module({
  imports: [UsersModule, BooksModule],
  controllers: [FilesController],
  providers: [UsersService, UserRepository, BooksService,],
})
export class FilesModule { }
