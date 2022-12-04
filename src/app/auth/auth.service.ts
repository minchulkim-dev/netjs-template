import { RefreshTokensRepository } from './../refresh-tokens/refresh-tokens.repository';
import { UserDocument } from '../users/schema/user.schema';
import { UsersRepository } from '../users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto, TokensDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // register method
  async register(registerDto: RegisterDto): Promise<TokensDto> {
    const {
      email,
      password,
      name,
    }: { email: string; password: string; name: string } = registerDto;

    const hashedPassword = await this.hashPassword(password);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    console.log(user);

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  // login method
  async login(loginDto: LoginDto): Promise<TokensDto> {
    const { email, password } = loginDto;

    // find user and throw error if not found
    const user = await this.usersRepository.findOne({
      email,
      deletedAt: null,
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // compare password and throw error if not match
    const isMatch = await this.comparePassword(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // generate access token and refresh token
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  // hashPassword method
  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt();
    return await bcrypt.hash(password, saltOrRounds);
  }

  // comparePassword method
  private async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // generateAccessToken method
  private async generateAccessToken(user: UserDocument) {
    const payload = user.getAccessTokenPayload();
    return this.jwtService.signAsync(
      { sub: user._id, payload },
      {
        secret: this.configService.get<string>('jwt.accessTokenSecretKey'),
        expiresIn: '15m',
      },
    );
  }

  // generateRefreshToken method
  private async generateRefreshToken(user: UserDocument) {
    return this.jwtService.signAsync(
      { sub: user._id },
      {
        secret: this.configService.get<string>('jwt.refreshTokenSecretKey'),
        expiresIn: '7d',
      },
    );
  }
}
