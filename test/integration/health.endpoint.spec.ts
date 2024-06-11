import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestingModule } from '../utils/nestjs/integration-testing-module';

describe('Health Endpoint', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestingModule();
    await app.init();
  });

  test('Application status (GET /health)', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/health');

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        status: 'ok',
        info: { database: { status: 'up' }, eventBus: { status: 'up' } },
      }),
    );
  });
});
