import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { BookEntity } from '../../entity/books.entity';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @Type(() => BookEntity)
  bookGenres: BookEntity[];
}
