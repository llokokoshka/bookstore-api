import { IsOptional, Length } from 'class-validator';

export class UpdatePassDto {
  @IsOptional()
  @Length(6, 24)
  password: string;

  @IsOptional()
  @Length(6, 24)
  passwordNew: string;
}
