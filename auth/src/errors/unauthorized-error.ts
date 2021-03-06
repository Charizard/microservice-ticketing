import CustomError from './custom-error';

export default class UnauthorizedError extends CustomError {
  statusCode = 401;
  
  constructor() {
    super('Unauthorized');

    // Only because we are extending a built in class.
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [
      { message: 'Unauthorized' }
    ];
  }
}