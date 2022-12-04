import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { IndexController } from './index.controller';

@Module({
  imports: [AuthModule, UsersModule],
  exports: [AuthModule, UsersModule],
  controllers: [IndexController],
})
export class IndexModule {}
