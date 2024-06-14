import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { createTestingModule } from '../utils/nestjs/integration-testing-module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { runWithRollbackTransaction } from '../utils/database/test-transaction';
import 'expect-more-jest';

initializeTransactionalContext();

describe('Account Customers Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;

  beforeAll(async () => {
    app = await createTestingModule();
    config = app.get<ConfigService>(ConfigService);
    await app.init();
  });

  describe('Find detail by public id (GET /account/customers/$publicId)', () => {
    test('with valid name', async () => {
      // Given
      const token = config.get('authentication.apiPrivateKey');
      const publicId = 'b40b40f2-7438-40ae-a310-a85361562526';

      // When
      const { status, body } = await request(app.getHttpServer())
        .get(`/account/customers/${publicId}`)
        .set('api-key', `${token}`);

      // Then
      expect(status).toBe(HttpStatus.OK);
      expect(body).toEqual(
        expect.objectContaining({
          name: 'Customer 1',
          socialIdentification: '123-45-6789',
          createdAt: expect.toBeIso8601(),
          updatedAt: null,
        }),
      );
    });

  });
});
