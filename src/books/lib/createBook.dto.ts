import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { AuthorEntity } from '../entity/author.entity';
import { BookToGenreEntity } from '../entity/bookGenre.entity';
import { CommentsEntity } from 'src/users/entity/comments.entity';
import { RateEntity } from 'src/users/entity/rate.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsOptional()
  @Type(() => AuthorEntity)
  author: AuthorEntity;

  @IsOptional()
  @Type(() => BookToGenreEntity)
  bookGenres: BookToGenreEntity[];

  @IsNotEmpty()
  @Type(() => CommentsEntity)
  comments: CommentsEntity[];

  @IsNotEmpty()
  @Type(() => RateEntity)
  rates: RateEntity[];
}
