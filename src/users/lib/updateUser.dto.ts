import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  fullName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  avatar: string;
}
