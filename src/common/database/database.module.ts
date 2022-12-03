import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { DatabaseOptionsService } from './database.options.service';

@Module({
  providers: [DatabaseOptionsService],
  exports: [DatabaseOptionsService],
  imports: [],
})
export class DatabaseOptionsModule {}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [DatabaseOptionsService],
      imports: [DatabaseOptionsModule],
      useFactory: (databaseOptionsService: DatabaseOptionsService) =>
        databaseOptionsService.createMongooseOptions(),
    }),
  ],
})
export class DatabaseModule {}
