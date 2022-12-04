import { Injectable } from '@nestjs/common';
import { RefreshTokensRepository } from './refresh-tokens.repository';

@Injectable()
export class RefreshTokensService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
  ) {}

  // create method
  async create(userId: string, token: string, expiresAt: Date) {
    return this.refreshTokensRepository.create({
      user: userId,
      token,
      expiresAt,
    });
  }
}
