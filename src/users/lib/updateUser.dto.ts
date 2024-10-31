import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  fullName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(6, 24)
  password: string;

  @IsOptional()
  avatar: string;
}
