import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../entity/users.entity';

export class ReqGetUserDto {
  @IsNotEmpty()
  user: UserEntity;
}
