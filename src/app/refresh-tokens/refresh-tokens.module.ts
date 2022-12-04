import { RefreshTokensRepository } from './refresh-tokens.repository';
import { RefreshTokensService } from './refresh-tokens.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [RefreshTokensService, RefreshTokensRepository],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
