export class ConsumeEventError extends Error {
  constructor(error: Error) {
    super(`${error.toString()}`);
    this.stack = error.stack;
    this.name = ConsumeEventError.name;
  }
}
