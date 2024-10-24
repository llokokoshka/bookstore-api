import { Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PayloadForTokensDto } from '../lib/payloadForTokens.dto';
import { ITokens } from '../lib/tokens.interface';

@Global()
@Injectable()
export class CreateTokensUtil {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async createTokens(payload: PayloadForTokensDto): Promise<ITokens> {
    const [access_token, refresh_token]: [string, string] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('token.accessToken'),
        expiresIn: '10s',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('token.refreshToken'),
        expiresIn: '6d',
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
