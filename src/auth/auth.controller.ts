import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/lib/loginUser.dto';
import { CreateUserDto } from 'src/users/lib/createUsers.dto';
import { RefreshTokenDto } from './lib/refreshToken.dto';
import { Public } from './decorators/guard.decorator';
import { ILogin } from './lib/login.interface';
import { IRegistration } from './lib/registration.interface';
import { IRefreshToken } from './lib/refreshToken.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  login(@Body() loginUserDto: LoginUserDto): Promise<ILogin> {
    console.log(loginUserDto);
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
    console.log(refreshTokenDto.refresh_token);
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }
}
