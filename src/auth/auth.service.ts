import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  generatePassword,
  validPassword,
  visibleParamsOfUser,
} from './utils/auth.utils';
import { UserRepository } from 'src/users/users.repository';
import { CreateTokensUtil } from './utils/token.utils';
import { LoginUserDto } from 'src/users/lib/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private createTokensUtil: CreateTokensUtil,
  ) {}

  async login(User: LoginUserDto) {
    const user = await this.userRepository.getUserByEmail(User.email);
    if (!user) {
      throw new HttpException(
        'user not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [salt, userHashPassword] = user.password.split('//');
    const isPasswordValid = validPassword(
      User.password,
      userHashPassword,
      salt,
    );

    if (isPasswordValid == false) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, username: user.email };

    const correctFormOfUser = visibleParamsOfUser(user);
    const { access_token, refresh_token } =
      await this.createTokensUtil.createTokens(payload);
    return {
      user: correctFormOfUser,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async registration(email: string, password: string) {
    const hashPass = generatePassword(password);
    password = hashPass.salt + '//' + hashPass.hash;
    const user = {
      fullName: '',
      email: email,
      password: password,
      avatar: 'defImg.png',
    };
    const addedUserInDb = await this.userRepository.createUser(user);
    if (!addedUserInDb) {
      throw new HttpException(
        'user not addited',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const payload = { sub: addedUserInDb.id, username: addedUserInDb.email };
    const { access_token, refresh_token } =
      await this.createTokensUtil.createTokens(payload);
    return {
      user: addedUserInDb,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async refreshToken(rt: string) {
    if (!rt) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(rt, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      const user = await this.userRepository.getUserById(payload.sub);
      const data = { sub: user.id, username: user.email };
      const { access_token, refresh_token } =
        await this.createTokensUtil.createTokens(data);
      return {
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
