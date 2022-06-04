// Create Error UserAlreadyExistsError
export default class UserAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserAlreadyExistsError';
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }
}
