import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  img: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  bookGenres: object;

  @IsNotEmpty()
  comments: object;

  @IsNotEmpty()
  rates: object;
}
