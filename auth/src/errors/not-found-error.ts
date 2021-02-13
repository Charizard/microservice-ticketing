import CustomError from './custom-error';

export default class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      { message: "Not found error" }
    ]
  }
}