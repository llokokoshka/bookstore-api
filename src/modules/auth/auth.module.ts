import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../users/users.repository';
import { CreateTokensUtil } from './utils/token.utils';
import { AuthUtils } from './utils/auth.utils';

@Module({
  imports: [UsersModule],
  providers: [AuthService, UserRepository, CreateTokensUtil, AuthUtils],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
