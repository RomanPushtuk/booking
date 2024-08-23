import moment from "moment";
import { HoursMunutesValidationError } from "../errors/HoursMunutesValidationError";
import { hoursMinutesSchema } from "../validationSchemas/hoursMinutesSchema";
import { CompareType } from "./Date";

export interface IHoursMinutes {
  hours: number;
  minutes: number;
}

export class HoursMinutes implements IValueObject, IHoursMinutes {
  public value: string;
  public hours: number;
  public minutes: number;

  // example 9:00
  constructor(time: string) {
    this.value = time;
    const [hoursStr, minutesStr] = time.split(":");
    this.hours = Number(hoursStr);
    this.minutes = Number(minutesStr);
    try {
      HoursMinutes.validate(this);
    } catch (err) {
      console.log(err);
      throw new HoursMunutesValidationError();
    }
  }

  static compare(time1: HoursMinutes, time2: HoursMinutes, type: CompareType = "more"): boolean {

    const m1Time = moment(time1.value, "hh:mm");
    const m2Time = moment(time2.value, "hh:mm");

    const diff = m2Time.diff(m1Time);

    if (type === "more") return diff < 0;
    if (type === "less") return diff > 0;
    if (type === "equal") return HoursMinutes.equal(time1, time2);
    return false;

  }

  static equal(time1: HoursMinutes, time2: HoursMinutes): boolean {

    return time1.value === time2.value;

  }

  static validate(time: HoursMinutes) {
    hoursMinutesSchema.validateSync(time);
  }
}
