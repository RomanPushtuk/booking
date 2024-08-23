import moment from "moment";
import { DateValidationError } from "../errors/DateValidationError";

export class Date {
  value: string;
  year: number;
  month: number;
  day: number;

  // 03/12/2024
  constructor(value: string) {
    this.value = value;

    const m = moment(value, "DD-MM-YYYY");
    this.year = m.year();
    this.month = m.month();
    this.day = m.day();

    try {
      Date.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

  public static validate(value: string) {
    //not sure but validation with moment may break DI
    // cuz we belong on moment implementation
    // and our incomming data type may get changed if moment api changes?
    // may i do it we regex?
    const m = moment(value, "DD-MM-YYYY");

    const year = m.year();
    const month = m.month();
    const day = m.day();

    if (!year || !month || !day) throw new DateValidationError();
  }

  static equal(d1: Date, d2: Date) {
    return d1.value === d2.value;
  }
}
