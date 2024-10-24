import * as crypto from 'crypto';
import { User } from 'src/users/entity/users.entity';

export function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return {
    salt: salt,
    hash: genHash,
  };
}

export function validPassword(password: string, hash: string, salt: string) {
  const checkHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === checkHash;
}

export function visibleParamsOfUser(user: User) {
  const visibleParamsOfUser = {
    fullName: user.fullName,
    email: user.email,
    Dob: user.Dob,
  };
  return visibleParamsOfUser;
}
