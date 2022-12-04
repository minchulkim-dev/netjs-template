import { RefreshTokensRepository } from './../refresh-tokens/refresh-tokens.repository';
import { UsersRepository } from '../users/users.repository';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '../refresh-tokens/schema/refresh-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, RefreshTokensRepository],
})
export class AuthModule {}
