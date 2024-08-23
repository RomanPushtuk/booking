export class CreateBookingDTOValidationError extends Error {
  constructor() {
    super("CreateBookingDTO validation error. Invalid constructor param.");
  }
}
