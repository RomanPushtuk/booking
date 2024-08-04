import moment from "moment";

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
  }

  static equal(d1: Date, d2: Date) {
    return d1.value === d2.value;
  }
}
