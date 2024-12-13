import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookIdDTO {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;
}
