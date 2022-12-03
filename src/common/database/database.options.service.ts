import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Environment } from '../../env/env.validation';
import { IDatabaseOptionsService } from './interfaces/database.interface';

@Injectable()
export class DatabaseOptionsService
  implements MongooseOptionsFactory, IDatabaseOptionsService
{
  private readonly env: string;
  private readonly host: string;
  private readonly port: string;
  private readonly name: string;
  private readonly user: string;
  private readonly password: string;
  private readonly options: string;
  private readonly debug: boolean;

  constructor(private readonly configService: ConfigService) {
    this.configService = configService;
    this.env = this.configService.get<string>('app.env');
    this.host = this.configService.get<string>('database.host');
    this.port = this.configService.get<string>('database.port');
    this.name = this.configService.get<string>('database.name');
    this.user = this.configService.get<string>('database.user');
    this.password = this.configService.get<string>('database.password');
    this.options = this.configService.get<string>('database.options');
    this.debug = this.configService.get<boolean>('database.debug');
  }

  createMongooseOptions(): MongooseModuleOptions {
    let uri;
    let authenticationInfo;

    if (this.user && this.password) {
      authenticationInfo = `${this.user}:${this.password}@`;
    }

    if (this.env === Environment.PRODUCTION || this.env === Environment.STAGE) {
      uri = `mongodb+srv://${authenticationInfo}${this.host}/${this.name}?${this.options}`;
    } else {
      uri = `mongodb://${authenticationInfo}${this.host}:${this.port}/${this.name}?${this.options}`;
    }

    const mongooseOptions: MongooseModuleOptions = {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    };

    if (this.env !== 'production') {
      mongoose.set('debug', this.debug);
    }

    return mongooseOptions;
  }
}
