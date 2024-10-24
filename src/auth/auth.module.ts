import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/users/users.repository';
import { CreateTokensUtil } from './utils/token.utils';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthService, UserRepository, CreateTokensUtil,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
