export class WorkHoursOverlappingError extends Error {
  constructor() {
    super("WorkPeriod array has overlapping time ranges");
  }
}
