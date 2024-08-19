import { HoursMunutesValidationError } from "../errors/HoursMunutesValidationError";
import { hoursMinutesSchema } from "../validationSchemas/hoursMinutesSchema";

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
      // HoursMinutes.validate(this);
    } catch (err) {
      console.log(err);
      throw new HoursMunutesValidationError();
    }
  }

  static validate(data: HoursMinutes) {
    hoursMinutesSchema.validateSync(data);
  }
}
