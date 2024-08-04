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
  }

  private getCountDays(value: string) {
    let [count, period] = value.split(" ");
    if (period.endsWith("s")) period = period.slice(0, -1);
    return [Number(count), map[period]];
  }
}
