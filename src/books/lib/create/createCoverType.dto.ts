import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CoverEntity } from 'src/books/entity/covers.entity';

export class CreateCoverTypeDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @Type(() => CoverEntity)
  cover: CoverEntity;
}
