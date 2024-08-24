export class LoginUserDTOValidationError extends Error {
  constructor() {
    super("LoginUserDTO validation error. Invalid constructor param.");
  }
}
