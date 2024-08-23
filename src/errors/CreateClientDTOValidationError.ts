export class CreateClientDTOValidationError extends Error {
  constructor() {
    super("CreateClientDTO validation error. Invalid constructor param.");
  }
}
