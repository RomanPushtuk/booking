export class BookingDTOValidationError extends Error {
  constructor() {
    super("BookingDTO validation error. Invalid constructor param.");
  }
}
