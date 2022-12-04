import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Internal Server Error';

    switch (exception.code) {
      case 11000:
        status = 409;
        const duplicateField = exception.message.split('{ ')[1].split(':')[0];
        message = `duplicate field: ${duplicateField}`;
    }

    response.status(status).json({
      message,
      exceptionFrom: 'MongoExceptionFilter',
    });
  }
}
