import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const method = request.method;
    const url = request.originalUrl;
    const userAgent = request.get('user-agent') || '';

    console.log(
      `Before... [${method}] ${url} - UserAgent: ${userAgent} | Body: ${JSON.stringify(
        request.body,
      )} | Params: ${JSON.stringify(request.params)} | Query: ${JSON.stringify(
        request.query,
      )}`,
    );

    return next.handle().pipe(
      tap(() => {
        return console.log(
          `After... ${response.statusCode} | [${method}] ${url} -${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}
