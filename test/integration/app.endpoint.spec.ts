import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { createTestingModule } from '../utils/nestjs/integration-testing-module';

describe('App Root Endpoint', () => {
  let app: INestApplication;
  let config: ConfigService;

  beforeEach(async () => {
    app = await createTestingModule();
    config = app.get<ConfigService>(ConfigService);
    await app.init();
  });

  test('Application Info (GET /)', async () => {
    const token = config.get('authentication.apiPrivateKey');
    const { status, text } = await request(app.getHttpServer())
      .get('/')
      .set('api-key', `${token}`);

    expect(status).toBe(200);
    expect(text).toEqual(
      'Application name: ' +
        config.get('application.name') +
        ', Node mode: test',
    );
  });
});
