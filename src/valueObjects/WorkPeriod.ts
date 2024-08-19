import { HoursMinutes } from "./HoursMinutes";

export class WorkPeriod implements IValueObject {
  from: HoursMinutes;
  to: HoursMinutes;

  constructor(from: HoursMinutes, to: HoursMinutes) {
    console.log(from, to);
    this.from = from;
    this.to = to;
    try {
      // WorkPeriod.validate(this);
    } catch (err) {
      throw new WorkPeriodValidationError();
    }
  }

  static validate(data: WorkPeriod): void {
    const { from, to } = data;
    HoursMinutes.validate(from);
    HoursMinutes.validate(to);

    const fromHoursMinutes = Number(from.hours + "" + from.minutes);
    const toHoursMinutes = Number(to.hours + "" + to.minutes);

    if (toHoursMinutes < fromHoursMinutes)
      throw new Error("'to' HoursMinutes shoul be after 'from'");
  }
}
