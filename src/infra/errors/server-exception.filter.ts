import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class ServerExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(ServerExceptionsFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const responseBody = {
        message: exception.getResponse(),
      };

      response.status(exception.getStatus()).json(responseBody);
    } else {
      this.logger.error(exception, exception.stack);

      const responseBody = {
        key: 'internal-server-error',
        message: exception.message,
      };

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseBody);
    }
  }
}
