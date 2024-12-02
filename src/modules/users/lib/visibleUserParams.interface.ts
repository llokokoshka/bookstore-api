import { RateEntity } from 'src/modules/books/entity/rate.entity';

export interface IVisibleUserParams {
  fullName: string;
  email: string;
  avatar: string;
  rating: RateEntity[];
}
