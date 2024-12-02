import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { BookToGenreEntity } from '../../entity/bookGenre.entity';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @Type(() => BookToGenreEntity)
  bookGenres: BookToGenreEntity[];
}
