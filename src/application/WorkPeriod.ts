import { WorkPeriodFromMoreThenToError } from "../errors/WorkPeriodFromMoreThenToError";
import { HoursMinutes } from "../valueObjects/HoursMinutes";

export class WorkPeriod implements IValueObject {
  from: HoursMinutes;
  to: HoursMinutes;

  constructor(from: HoursMinutes, to: HoursMinutes) {
    if (HoursMinutes.compare(from, to, "more")) {
      throw new WorkPeriodFromMoreThenToError();
    }

    this.from = from;
    this.to = to;
  }

  public static fromFlat(from: string, to: string) {
    return new WorkPeriod(new HoursMinutes(from), new HoursMinutes(to));
  }
}
