import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{
      message: this.message
    }]
  }

  constructor(public message: string) {
    super(message);

    // required when extending built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

}