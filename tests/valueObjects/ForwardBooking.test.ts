import { ForwardBooking } from "../../src/valueObjects/ForwardBooking";

describe("ForwardBooking Value Object", () => {
  test("Valid ForwardBooking Value Object should not throw an Error", () => {
    const validData = "2 weeks";

    expect(() => new ForwardBooking(validData)).not.toThrow();
  });
  test("Invalid ForwardBooking Value Object should throw an Error", () => {
    const validData = "2weeks";

    expect(() => new ForwardBooking(validData)).toThrow();
  });
  test("Invalid ForwardBooking Value Object should throw an Error", () => {
    const validData = "weeks";

    expect(() => new ForwardBooking(validData)).toThrow();
  });
  test("Invalid ForwardBooking Value Object should throw an Error", () => {
    const validData = "1 qwe";

    expect(() => new ForwardBooking(validData)).toThrow();
  });
});
