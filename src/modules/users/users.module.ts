import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { UserEntity } from './entity/users.entity';
import { UsersController } from './users.controller';
import { CreateTokensUtil } from '../auth/utils/token.utils';
import { AuthUtils } from '../auth/utils/auth.utils';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UserRepository, CreateTokensUtil, AuthUtils],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
