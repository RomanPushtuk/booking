import { Days } from "../enums/Days";
import { WeekdayValidationError } from "../errors/WeekdayValidationError";

export class Weekday implements IValueObject {
  readonly value: string;

  constructor(weekday: string) {
    this.value = weekday;
    try {
      Weekday.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new WeekdayValidationError();
    }
  }

  static equal(weekday1: Weekday, weekday2: Weekday): boolean {
    return weekday1.value === weekday2.value;
  }

  public static validate(weekday: string) {
    if (!Object.values<string>(Days).includes(weekday))
      throw new WeekdayValidationError();
  }
}
