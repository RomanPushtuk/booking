import moment from "moment";

export class Timestamp {
  public value: string;

  // YYYY-MM-DD HH:mm:ss => 2024-10-31 09:40:21
  constructor(value: string) {
    this.value = value;

    Timestamp.validate(value);
  }

  public static validate(value: string) {
    const m = moment(value, "YYYY-MM-DD HH:mm:ss", true);
    if (!m.isValid()) throw new Error("Timestamp validation error");
  }
}
