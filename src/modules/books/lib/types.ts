import { UserEntity } from 'src/modules/users/entity/users.entity';
import { PageOptionsDto } from './paginate/pageOptions.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export interface IComments {
  text: string;
  user: UserEntity;
  bookId: number;
  id: number;
  dateOfCreate: Date;
}
