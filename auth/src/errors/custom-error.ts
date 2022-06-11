export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[]

  // require message string for server logs
  constructor(message: string) {
    super(message);

    // required when extending built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}