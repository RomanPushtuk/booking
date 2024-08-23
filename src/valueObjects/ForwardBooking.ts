import { ForwardBookingValidationError } from "../errors/ForwardBookingValidationError";

const map: { [key: string]: number } = {
  day: 1,
  week: 7,
  month: 30,
};

export class ForwardBooking implements IValueObject {
  readonly value: string;
  readonly count: number;
  readonly days: number;

  // example - 2 days
  constructor(value: string) {
    this.value = value;
    const [count, days] = this.getCountDays(this.value);
    this.count = count;
    this.days = days;

    try {
      ForwardBooking.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new ForwardBookingValidationError();
    }
  }

  public static validate(value: string): void {
    // eslint-disable-next-line prefer-const
    let [count, period] = value.split(" ");
    if (!count || !period) throw new ForwardBookingValidationError();
    if (period.endsWith("s")) period = period.slice(0, -1);
    const periodDays = map[period];

    if (!Number(count) || !periodDays)
      throw new ForwardBookingValidationError();
  }

  private getCountDays(value: string) {
    // eslint-disable-next-line prefer-const
    let [count, period] = value.split(" ");
    if (period.endsWith("s")) period = period.slice(0, -1);
    return [Number(count), map[period]];
  }
}
