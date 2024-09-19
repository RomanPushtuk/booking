export class SortDirectionValidationError extends Error {
  constructor() {
    super(
      "SortDirection validation error. Value should be only 'desc' or 'asc'",
    );
  }
}
