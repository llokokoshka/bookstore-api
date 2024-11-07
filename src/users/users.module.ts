import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { UserEntity } from './entity/users.entity';
import { UsersController } from './users.controller';
import { CreateTokensUtil } from 'src/auth/utils/token.utils';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [UsersService, UserRepository, CreateTokensUtil],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
