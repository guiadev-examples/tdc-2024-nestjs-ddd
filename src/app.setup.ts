import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ClientAuthGuard } from './infra/auth/guards/client-auth.guard';
import { UserAuthGuard } from './infra/auth/guards/user-auth.guard';
import { ErrorFilterSetup } from '@infra/errors/errors-filter.setup';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ApiDocSetup } from '@infra/apidoc/apidoc.setup';

export class AppSetup {
  public static apply(app: INestApplication) {
    const configService = app.get(ConfigService);

    ErrorFilterSetup.apply(app);

    app.useLogger(configService.get('application.logLevel'));
    // app.useGlobalInterceptors(new LoggingInterceptor());

    app.useGlobalPipes(
      new ValidationPipe({
        enableDebugMessages: true,
        transform: true,
        validationError: {
          target: true,
          value: true,
        },
      }),
    );

    const reflector = app.get(Reflector);
    app.useGlobalGuards(
      new ClientAuthGuard(reflector),
      new UserAuthGuard(reflector),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.enableShutdownHooks();

    ApiDocSetup.apply(app);
  }
}
