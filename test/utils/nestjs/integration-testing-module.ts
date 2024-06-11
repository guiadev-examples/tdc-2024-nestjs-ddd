//loaded first so that nest import considers the mock
import { mockSQSConsumer } from '../mock/sqs-consumer';
mockSQSConsumer();

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { AppSetup } from '../../../src/app.setup';

export async function createTestingModule(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  AppSetup.apply(app);

  return app;
}
