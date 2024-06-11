export class PublishEventError extends Error {
  constructor(error: Error) {
    super(`${error.toString()}`);
    this.stack = error.stack;
    this.name = PublishEventError.name;
  }
}
