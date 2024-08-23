import { Email } from "../../src/valueObjects/Email";

describe("Email Value Object", () => {
  test("Valid Email Value Object should not throw an Error", () => {
    const validData = "qwe@gmail.com";

    expect(() => new Email(validData)).not.toThrow();
  });
  test("Invalid Email Value Object should throw an Error", () => {
    const invalidData = "qwe@@gmail.com";

    expect(() => new Email(invalidData)).toThrow();
  });

  test("Invalid Email Value Object should not throw an Error max width 123", () => {
    const validData = new Array(113).fill("q").join("") + "@gmail.com";

    expect(() => new Email(validData)).not.toThrow();
  });
  test("Invalid Email Value Object should throw an Error max width 123", () => {
    const invalidData = new Array(114).fill("q").join("") + "@gmail.com";

    expect(() => new Email(invalidData)).toThrow();
  });
});
