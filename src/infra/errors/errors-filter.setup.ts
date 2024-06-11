import { INestApplication } from '@nestjs/common';
import { BusinessExceptionsFilter } from './business-exception.filter';
import { ServerExceptionsFilter } from './server-exception.filter';
import { EntityNotFoundFilter } from './entity-not-found.filter';

export class ErrorFilterSetup {
  public static apply(app: INestApplication) {
    app.useGlobalFilters(new ServerExceptionsFilter());
    app.useGlobalFilters(new BusinessExceptionsFilter());
    app.useGlobalFilters(new EntityNotFoundFilter());
  }
}
