import { IsNotEmpty } from 'class-validator';

export class PayloadForTokensDto {
  @IsNotEmpty()
  sub: number;

  @IsNotEmpty()
  username: string;
}
