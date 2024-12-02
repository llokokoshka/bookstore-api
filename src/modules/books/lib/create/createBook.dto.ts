import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { AuthorEntity } from '../../entity/author.entity';
import { BookToGenreEntity } from '../../entity/bookGenre.entity';
import { CoverEntity } from '../../entity/covers.entity';
import { RateEntity } from '../../entity/rate.entity';
import { CommentsEntity } from '../../entity/comments.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  img: any;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  isBestseller: boolean;

  @IsBoolean()
  @IsOptional()
  isNew: boolean;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dateOfIssue: Date;

  @IsOptional()
  @Type(() => AuthorEntity)
  author: AuthorEntity;

  @IsOptional()
  @Type(() => BookToGenreEntity)
  bookGenres: BookToGenreEntity[];

  @IsNotEmpty()
  @Type(() => CoverEntity)
  cover: CoverEntity;

  @IsNotEmpty()
  @Type(() => CommentsEntity)
  comments: CommentsEntity[];

  @IsOptional()
  @Type(() => RateEntity)
  rates: RateEntity[];
}
