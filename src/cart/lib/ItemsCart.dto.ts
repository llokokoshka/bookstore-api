import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookIdDTO {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;
}
