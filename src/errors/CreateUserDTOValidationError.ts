export class CreateUserDTOValidationError extends Error {
  constructor() {
    super("CreateUserDTO validation error. Invalid constructor param.");
  }
}
