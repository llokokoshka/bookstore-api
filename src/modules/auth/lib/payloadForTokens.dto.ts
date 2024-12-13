import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PayloadForTokensDto {
  @IsNotEmpty()
  @IsNumber()
  sub: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}
