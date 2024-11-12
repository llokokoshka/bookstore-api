import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';
import { FilesController } from './files.controller';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/users.repository';

@Module({
  imports: [UsersModule],
  controllers: [FilesController],
  providers: [UsersService, UserRepository],
})
export class FilesModule { }
