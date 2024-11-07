import { UserEntity } from 'src/users/entity/users.entity';

export interface IRegistration {
  user: UserEntity;
  access_token: string;
  refresh_token: string;
}
