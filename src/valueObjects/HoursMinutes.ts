import moment from "moment";
import { HoursMunutesValidationError } from "../errors/HoursMunutesValidationError";
import { hoursMinutesSchema } from "../validationSchemas/hoursMinutesSchema";
import { CompareType } from "./Date";

export class HoursMinutes {
  public value: string;
  public hours: number;
  public minutes: number;

  // example 9:00
  constructor(time: string) {
    this.value = time;
    const { hours, minutes } = this.getHoursMinutes(this.value);
    this.hours = hours;
    this.minutes = minutes;
    try {
      HoursMinutes.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new HoursMunutesValidationError();
    }
  }

  static compare(
    time1: HoursMinutes,
    time2: HoursMinutes,
    type: CompareType = "more",
  ): boolean {
    const m1Time = moment(time1.value, "hh:mm");
    const m2Time = moment(time2.value, "hh:mm");

    const diff = m2Time.diff(m1Time);

    if (type === "more") return diff < 0;
    if (type === "less") return diff > 0;
    if (type === "equal") return time1.value === time2.value;
    return false;
  }

  static validate(hoursMinutes: string) {
    const [hoursStr, minutesStr] = hoursMinutes.split(":");
    hoursMinutesSchema.validateSync({
      hours: Number(hoursStr),
      minutes: Number(minutesStr),
    });
  }

  private getHoursMinutes(time: string): { hours: number; minutes: number } {
    const [hoursStr, minutesStr] = time.split(":");
    return { hours: Number(hoursStr), minutes: Number(minutesStr) };
  }
}
