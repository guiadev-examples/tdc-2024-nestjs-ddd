import { Transactional } from 'typeorm-transactional';

export type RunFunction = () => Promise<void> | void;

class RollbackErrorException extends Error {}

/**
 * Runs the code in a transaction and runs rollback on the transaction at the
 * end of it.
 * @param func The function you want run in a transaction
 */
export function runWithRollbackTransaction(func: RunFunction) {
  return async () => {
    try {
      await TransactionCreator.run(func);
    } catch (e) {
      if (e instanceof RollbackErrorException) {
        // Do nothing here, the transaction has now been rolled back.
      } else {
        throw e;
      }
    }
  };
}

class TransactionCreator {
  @Transactional()
  static async run(func: RunFunction) {
    await func();
    // Once the function has run, we throw an exception to ensure that the
    // transaction rolls back.
    throw new RollbackErrorException(
      `This is thrown to cause a rollback on the transaction.`,
    );
  }
}
