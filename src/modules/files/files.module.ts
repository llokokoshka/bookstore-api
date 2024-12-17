import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { FilesController } from './files.controller';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { BooksService } from '../books/books.service';
import { BooksModule } from '../books/books.module';
import { AuthUtils } from '../auth/utils/auth.utils';
import { FileUtils } from './utils/file.utils';

@Module({
  imports: [UsersModule, BooksModule],
  controllers: [FilesController],
  providers: [UsersService, UserRepository, BooksService, AuthUtils, FileUtils],
})
export class FilesModule {}
