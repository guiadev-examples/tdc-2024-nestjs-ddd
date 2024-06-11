export class BusinessError extends Error {
  constructor(
    public error: Error | string,
    public key?: string,
  ) {
    super(`${error.toString()}`);
    this.name = BusinessError.name;
    if (error instanceof Error) {
      this.message = error.message;
      this.stack = error.stack;
    }
  }
}
