import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { AuthorEntity } from '../entity/author.entity';
import { BookToGenreEntity } from '../entity/bookGenre.entity';
import { CommentsEntity } from 'src/users/entity/comments.entity';
import { RateEntity } from 'src/users/entity/rate.entity';
import { CoverEntity } from '../entity/covers.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsBoolean()
  @IsOptional()
  isBestseller: boolean;

  @IsBoolean()
  @IsOptional()
  isNew: boolean;

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

  @IsNotEmpty()
  @Type(() => CoverEntity)
  covers: CoverEntity[];
}
