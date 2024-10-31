import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [FilesController],
  providers: [UsersService, UserRepository],
})
export class FilesModule {}
