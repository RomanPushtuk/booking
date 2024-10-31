import moment from "moment";
import { DateValidationError } from "../errors/DateValidationError";

//TODO not sure where to move it to
export type CompareType = "more" | "less" | "equal";

export class Date {
  value: string;
  year: number;
  month: number;
  day: number;

  // 2024-12-03
  constructor(value: string) {
    this.value = value;

    const m = moment(value, "YYYY-MM-DD", true);
    this.year = m.year();
    this.month = m.month();
    this.day = m.date();

    try {
      Date.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new DateValidationError();
    }
  }

  public static validate(value: string) {
    const m = moment(value, "YYYY-MM-DD");
    if (!m.isValid()) throw new DateValidationError();
  }

  public static compare(
    date1: Date,
    date2: Date,
    type: CompareType = "more",
  ): boolean | number {
    const m1Date = moment(date1.value, "YYYY-MM-DD", true);
    const m2Date = moment(date2.value, "YYYY-MM-DD", true);

    const diff = m2Date.diff(m1Date);

    if (type === "more") return diff < 0;
    if (type === "less") return diff > 0;
    if (type === "equal") return date1.value === date2.value;

    throw new Error("Unreal comparing");
  }
}
