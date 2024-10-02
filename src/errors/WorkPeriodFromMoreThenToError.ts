export class WorkPeriodFromMoreThenToError extends Error {
  constructor() {
    super("Time 'from' cannot be more then time 'to'");
  }
}
