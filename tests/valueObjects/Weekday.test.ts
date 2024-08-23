import { Weekday } from "../../src/valueObjects/Weekday";
import { Days } from "../../src/enums/Days";

describe("Weekday Value Object", () => {
  test("Valid Weekday Value Object should not throw an Error", () => {
    expect(() => new Weekday(Days.Friday)).not.toThrow();
  });
  test("Weekdays should be equal", () => {
    const Weekday1 = new Weekday(Days.Monday);
    const Weekday2 = new Weekday(Days.Monday);

    expect(Weekday.equal(Weekday1, Weekday2)).toBe(true);
  });

  test("Invalid Weekday Value Object should not throw an Error", () => {
    expect(() => new Weekday("myWeekday")).toThrow();
  });
});
