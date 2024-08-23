export class UserDTOValidationError extends Error {
  constructor() {
    super("UserDTO validation error. Invalid constructor param.");
  }
}
