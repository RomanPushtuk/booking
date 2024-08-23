import { HoursMinutes } from "../../src/valueObjects/HoursMinutes";

describe("HoursMinutes Value Object", () => {
  test("Valid HoursMinutes Value Object should not throw an Error", () => {
    const validData = "09:50";

    expect(() => new HoursMinutes(validData)).not.toThrow();
  });
  test("Invalid HoursMinutes Value Object should throw an Error", () => {
    const invalidData = "09:";

    expect(() => new HoursMinutes(invalidData)).toThrow();
  });
  test("Invalid HoursMinutes Value Object should throw an Error", () => {
    const invalidData = "90:09";

    expect(() => new HoursMinutes(invalidData)).toThrow();
  });
  test("time should be equal", () => {
    const validTime = "10:55";

    const time1 = new HoursMinutes(validTime);
    const time2 = new HoursMinutes(validTime);

    expect(HoursMinutes.compare(time1, time2, "equal")).toBe(true);
  });
  test("time1 should be less than time2", () => {
    const time1 = new HoursMinutes("10:55");
    const time2 = new HoursMinutes("11:55");

    expect(HoursMinutes.compare(time1, time2, "less")).toBe(true);
  });
  test("time1 should be less than time2", () => {
    const time1 = new HoursMinutes("10:55");
    const time2 = new HoursMinutes("11:55");

    expect(HoursMinutes.compare(time1, time2, "less")).toBe(true);
  });
});
