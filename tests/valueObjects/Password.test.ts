import { Password } from "../../src/valueObjects/Password";

describe("Password Value Object", () => {
  test("Valid Password Value Object should not throw an Error", () => {
    const validData = "123456Qq";

    expect(() => new Password(validData)).not.toThrow();
  });
  test("Valid Password Value Object should not throw an Error", () => {
    const longData = "Qw" + new Array(121).fill("0").join("");
    const shortData = "Qw0001";

    expect(() => new Password(longData)).not.toThrow();
    expect(() => new Password(shortData)).not.toThrow();
  });
  test("Invalid Password Value Object should throw an Error", () => {
    const longData = "Qw" + new Array(122).fill("0").join("");
    const shortData = "Qw000";

    expect(() => new Password(longData)).toThrow();
    expect(() => new Password(shortData)).toThrow();
  });
  test("Invalid Password Value Object should throw an Error", () => {
    const invalidData = "123456";
    expect(() => new Password(invalidData)).toThrow();
  });

  test("Invalid Password Value Object should throw an Error", () => {
    const invalidData = "1234567Q";

    expect(() => new Password(invalidData)).toThrow();
  });
  test("Passwords should be equal", () => {
    const validData = "12345678Qwe";

    const password1 = new Password(validData);
    const password2 = new Password(validData);

    expect(Password.equal(password1, password2)).toBe(true);
  });
});
