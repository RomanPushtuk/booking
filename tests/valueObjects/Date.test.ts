import { Date } from "../../src/valueObjects/Date";

describe("Date Value Object", () => {
  test("Valid Date Value Object should not throw an Error", () => {
    const validData = "03/12/2024";

    expect(() => new Date(validData)).not.toThrow();
  });

  test("Date Value Objects should be equal", () => {
    const validData = "03/12/2024";

    const date1 = new Date(validData);
    const date2 = new Date(validData);

    expect(() => Date.compare(date1, date2, "equal")).not.toThrow();
  });

  test("Date1 should be more than Date2", () => {
    const date1 = new Date("04/12/2024");
    const date2 = new Date("03/12/2024");

    expect(Date.compare(date1, date2)).toBe(true);
  });
  test("Date1 should be less than Date2", () => {
    const date1 = new Date("03/12/2024");
    const date2 = new Date("04/12/2024");

    expect(Date.compare(date1, date2, "less")).toBe(true);
  });

  test("Invalid Date Value Object should throw an Error", () => {
    const invalidData = "99/99/9999";
    expect(() => new Date(invalidData)).toThrow();
  });

  test("Invalid Date Value Object should throw an Error", () => {
    const invalidData = "99/9999";
    expect(() => new Date(invalidData)).toThrow();
  });
});
