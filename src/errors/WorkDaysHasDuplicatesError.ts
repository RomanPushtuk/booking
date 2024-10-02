export class WorkDaysHasDuplicatesError extends Error {
  constructor() {
    super("WorkDays array has duplicated days");
  }
}
