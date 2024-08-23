import { HoursMinutes } from "../valueObjects/HoursMinutes";

export class WorkPeriod implements IValueObject {
  from: HoursMinutes;
  to: HoursMinutes;

  constructor(from: HoursMinutes, to: HoursMinutes) {
    this.from = from;
    this.to = to;
  }
}
