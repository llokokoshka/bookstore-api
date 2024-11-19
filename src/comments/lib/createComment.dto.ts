import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BookEntity } from 'src/books/entity/books.entity';
import { UserEntity } from 'src/users/entity/users.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @Type(() => UserEntity)
  user: UserEntity;

  @IsOptional()
  @Type(() => BookEntity)
  book: BookEntity;
}
