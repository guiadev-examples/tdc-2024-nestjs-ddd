export function mockSQSConsumer() {
  jest.mock('sqs-consumer', () => ({
    Consumer: {
      create: jest.fn().mockReturnValue({
        emit: jest.fn().mockImplementation(() => {}),
        on: jest.fn().mockImplementation(() => {}),
        once: jest.fn().mockImplementation(() => {}),
        start: jest
          .fn()
          .mockImplementation(() =>
            console.log('SQS Consumer start is mocked'),
          ),
        stop: jest.fn().mockImplementation(() => {}),
      }),
    },
  }));
}
