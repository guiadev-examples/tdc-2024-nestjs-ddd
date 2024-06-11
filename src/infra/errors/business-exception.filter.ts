import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BusinessError } from './business.error';

@Catch(BusinessError)
export class BusinessExceptionsFilter implements ExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const responseBody = {
      key: exception.key,
      message: exception.message,
    };

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(responseBody);
  }
}
