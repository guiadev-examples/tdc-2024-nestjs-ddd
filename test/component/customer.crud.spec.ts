import { TestingModule } from '@nestjs/testing';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { createTestingModule } from '../utils/nestjs/component-testing-module';
import { runWithRollbackTransaction } from '../utils/database/test-transaction';
import { CustomerService } from '@domain/accounts/customer.service';
import { AccountsContextModule } from '@domain/accounts/accounts.module';
import { Customer } from '@domain/accounts/customer.entity';

initializeTransactionalContext();

describe('Customer Crud Features', () => {
  let component: CustomerService;

  beforeAll(async () => {
    jest.mock('typeorm-transactional', () => ({
      Transactional: () => () => ({}),
    }));

    const module: TestingModule = await createTestingModule([
      AccountsContextModule,
    ]);

    component = module.get<CustomerService>(CustomerService);
  });

  describe('Find detail by public id', () => {
    test('with existing uuid', async () => {
      // Given
      const publicId = 'b40b40f2-7438-40ae-a310-a85361562526';

      //When
      const customer = await component.findByPublicId(publicId);

      //Then
      expect(customer).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          publicId: publicId,
          name: 'Customer 1',
          socialIdentification: '123-45-6789',
          createdAt: expect.any(Date),
          updatedAt: null,
        }),
      );
    });

    test('with non-existent uuid', async () => {
      // Given
      const publicId = 'c22b48a8-c5a9-45e5-97d1-686d457b9f18';

      //When
      const customer = component.findByPublicId(publicId);

      //Then
      await expect(customer).rejects.toThrow(
        expect.objectContaining({ name: 'EntityNotFoundError' }),
      );
    });

    test('with invalid uuid', async () => {
      // Given
      const publicId = '11111111-1111-1111-1111-11111111111';

      //When
      const customer = component.findByPublicId(publicId);

      //Then
      await expect(customer).rejects.toThrow(
        expect.objectContaining({
          name: 'BusinessError',
          message: expect.stringContaining('Invalid UUID for publicId'),
        }),
      );
    });
  });

  describe('Create customer', () => {
    test(
      'with valid data',
      runWithRollbackTransaction(async () => {
        // Given
        const customer = new Customer({
          name: 'Test',
          socialIdentification: '123456789'
        });

        //When
        const createdCustomer = await component.create(customer);

        //Then
        expect(createdCustomer).toEqual(
          expect.objectContaining({
            id: expect.any(Number),            
            createdAt: expect.any(Date),
            updatedAt: null,
            name: customer.name,
            socialIdentification: customer.socialIdentification,
          }),
        );
      }),
    );
  });
});
