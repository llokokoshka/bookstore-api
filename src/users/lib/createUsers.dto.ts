import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @Length(6, 24)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  Dob: Date;
}
