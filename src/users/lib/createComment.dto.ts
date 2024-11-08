import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../entity/users.entity';
import { BookEntity } from 'src/books/entity/books.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsOptional()
  @Type(() => UserEntity)
  user: UserEntity;

  @IsOptional()
  @Type(() => BookEntity)
  book: BookEntity;
}
