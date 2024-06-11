import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppSetup } from './app.setup';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  AppSetup.apply(app);

  await app.listen(configService.get('application.port'));

  process.stdin.resume();
}

bootstrap();
