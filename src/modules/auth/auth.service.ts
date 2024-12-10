import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  generatePassword,
  validPassword,
  visibleParamsOfUser,
} from './utils/auth.utils';
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
  ) { }

  async login(User: LoginUserDto) {
    try {
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
    } catch (err) {
      this.logger.error(err);
    }
  }

  async registration(email: string, password: string) {
    try {
      const hashPass = generatePassword(password);
      password = hashPass.salt + '//' + hashPass.hash;
      let code = '';
      [1, 2, 3, 4, 5, 6].map(() => {
        return code += Math.round(Math.random() * 10).toString()
      })
      const randomName = 'User' + code;
      const user = {
        fullName: randomName,
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
    } catch (err) {
      this.logger.error(err);
    }
  }

  async refreshToken(rt: string) {
    if (!rt) {
      throw new UnauthorizedException();
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
      throw new UnauthorizedException();
    }
  }
}
