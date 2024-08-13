import { Days } from "../enums/Days";

export class Weekday implements IValueObject {
  readonly value: string;

  constructor(weekday: string) {
    this.value = weekday;
    try {
      Weekday.validate(this);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

  public static validate(weekday: Weekday) {
    if (!Object.values<string>(Days).includes(weekday.value)) throw new Error();
  }
}
