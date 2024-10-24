import { IVisibleUserParams } from 'src/users/lib/visibleUserParams.interface';

export interface ILogin {
  user: IVisibleUserParams;
  access_token: string;
  refresh_token: string;
}
