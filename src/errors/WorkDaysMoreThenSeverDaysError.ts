export class WorkDaysMoreThenSeverDaysError extends Error {
  constructor() {
    super("WorkDays array cannot be more then 7 days");
  }
}
