import { IsDefined, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsDefined()
  @IsString()
  refresh_token: string;
}
