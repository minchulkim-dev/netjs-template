import { DatabaseModule } from '../common/database/database.module';
import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import configs from '../env/configs';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../env/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      load: configs,
    }),
    DatabaseModule,
    IndexModule,
  ],
})
export class AppModule {}
