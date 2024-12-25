import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetRecommendedDto {
  @IsNotEmpty()
  @IsNumber()
  numberOfItems: number;
}
