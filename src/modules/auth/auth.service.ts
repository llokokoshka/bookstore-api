import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthUtils } from './utils/auth.utils';
import { UserRepository } from 'src/modules/users/users.repository';
import { CreateTokensUtil } from './utils/token.utils';
import { LoginUserDto } from 'src/modules/users/lib/loginUser.dto';
import config from '../../config/configuration';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private createTokensUtil: CreateTokensUtil,
    private authUtils: AuthUtils,
  ) {}

  async login(User: LoginUserDto) {
    try {
      const user = await this.userRepository.getUserByEmail(User.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      const [salt, userHashPassword] = user.password.split('//');
      const isPasswordValid = this.authUtils.validPassword(
        User.password,
        userHashPassword,
        salt,
      );

      if (isPasswordValid == false) {
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      }

      const payload = { sub: user.id, username: user.email };

      const correctFormOfUser = this.authUtils.visibleParamsOfUser(user);
      const { access_token, refresh_token } =
        await this.createTokensUtil.createTokens(payload);
      return {
        user: correctFormOfUser,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(`${err.response}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async registration(email: string, password: string) {
    try {
      const hashPass = this.authUtils.generatePassword(password);
      password = hashPass.salt + '//' + hashPass.hash;
      let code = '';
      [1, 2, 3, 4, 5, 6].map(() => {
        return (code += Math.round(Math.random() * 10).toString());
      });
      const randomName = 'User' + code;
      const user = {
        fullName: randomName,
        email: email,
        password: password,
        avatar: 'defImg.png',
      };
      const addedUserInDb = await this.userRepository.createUser(user);

      const payload = { sub: addedUserInDb.id, username: addedUserInDb.email };
      const { access_token, refresh_token } =
        await this.createTokensUtil.createTokens(payload);

      const correctViewOfNewUserData =
        this.authUtils.visibleParamsOfUser(addedUserInDb);
      return {
        user: correctViewOfNewUserData,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch (err) {
      this.logger.error(err);
      if (
        err
          .toString()
          .includes('duplicate key value violates unique constraint')
      ) {
        throw new HttpException(
          'Email is already in use',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException('User not addited', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async refreshToken(rt: string) {
    if (!rt) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const payload = await this.jwtService.verifyAsync(rt, {
        secret: config.token.refreshToken,
      });
      const user = await this.userRepository.getUserById(payload.sub);
      const data = { sub: user.id, username: user.email };
      const { access_token, refresh_token } =
        await this.createTokensUtil.createTokens(data);
      return {
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Can`t update token', HttpStatus.UNAUTHORIZED);
    }
  }
}
