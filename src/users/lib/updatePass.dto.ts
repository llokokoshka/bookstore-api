import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePassDto {
  @IsOptional()
  @Length(6, 24)
  @IsString()
  password: string;

  @IsOptional()
  @Length(6, 24)
  @IsString()
  passwordNew: string;
}
