import { IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  fullName: string;

  @IsOptional()
  @Length(6, 24)
  password: string;

  @IsOptional()
  Dob: Date;
}
