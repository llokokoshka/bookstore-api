import { IsNotEmpty } from 'class-validator';
import { User } from '../entity/users.entity';

export class ReqGetUserDto {
  @IsNotEmpty()
  user: User;
}
