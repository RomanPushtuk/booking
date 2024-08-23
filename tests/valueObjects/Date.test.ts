import { Date } from "../../src/valueObjects/Date";

describe("Date Value Object", () => {
  test("Valid Date Value Object should not throw an Error", () => {
    const validData = "03/12/2024";

    expect(() => new Date(validData)).not.toThrow();
  });

  test("Date Value Objects should be equal", () => {
    const validData = "03/12/2024";

    const Date1 = new Date(validData);
    const Date2 = new Date(validData);

    expect(() => Date.equal(Date1, Date2)).not.toThrow();
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
