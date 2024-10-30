import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class LoginUserDto {
  // @IsOptional()
  // fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 24)
  password: string;
}
