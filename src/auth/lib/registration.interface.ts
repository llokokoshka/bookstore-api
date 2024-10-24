import { User } from 'src/users/entity/users.entity';

export interface IRegistration {
  user: User;
  access_token: string;
  refresh_token: string;
}
