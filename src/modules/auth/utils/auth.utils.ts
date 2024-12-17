import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { UserEntity } from 'src/modules/users/entity/users.entity';

@Injectable()
export class AuthUtils {
  constructor() {}

  generatePassword = (password: string) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
    return {
      salt: salt,
      hash: genHash,
    };
  };

  validPassword = (password: string, hash: string, salt: string) => {
    const checkHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
    return hash === checkHash;
  };

  visibleParamsOfUser = (user: UserEntity) => {
    const correctViewOfUserRates = {};
    user.rates.forEach((value) => {
      correctViewOfUserRates[value.book.id] = value;
    });
    const visibleParamsOfUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      rating: correctViewOfUserRates,
    };
    return visibleParamsOfUser;
  };
}
