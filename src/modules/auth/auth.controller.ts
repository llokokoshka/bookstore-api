import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/guard.decorator';
import { LoginUserDto } from '../users/lib/loginUser.dto';
import { CreateUserDto } from '../users/lib/createUsers.dto';
import { RefreshTokenDto } from './lib/refreshToken.dto';
import { IRegistration } from './lib/registration.interface';
import { IRefreshToken } from './lib/refreshToken.interface';
import { ILogin } from './lib/login.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  login(@Body() loginUserDto: LoginUserDto): Promise<ILogin> {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @Post('sign-up')
  registration(@Body() createUserDto: CreateUserDto): Promise<IRegistration> {
    return this.authService.registration(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Public()
  @Post('refresh-token')
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<IRefreshToken> {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }
}
