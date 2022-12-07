import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 120)
  password: string;

  @IsString()
  @Length(3, 40)
  @Matches(/^[A-Za-zŽžÀ-ÿ가-힣ぁ-ゔァ-ヴー々〆〤一-龥]+$/, {
    message: 'Name can only contain letters.',
  })
  name: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 120)
  password: string;
}

export class TokensDto {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokensDto {
  @IsString()
  refreshToken: string;
}
