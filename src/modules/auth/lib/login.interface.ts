import { IVisibleUserParams } from 'src/modules/users/lib/visibleUserParams.interface';

export interface ILogin {
  user: IVisibleUserParams;
  access_token: string;
  refresh_token: string;
}
