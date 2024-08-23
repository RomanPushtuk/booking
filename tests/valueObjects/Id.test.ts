import { Id } from "../../src/valueObjects/Id";

describe("Id Value Object", () => {
  test("Valid Id Value Object should not throw an Error", () => {
    const validData = "12345678";

    expect(() => new Id(validData)).not.toThrow();
  });
  test("Invalid Id Value Object should throw an Error", () => {
    const invalidData = "123456789";
    expect(() => new Id(invalidData)).toThrow();
  });

  test("Invalid Id Value Object should throw an Error max width 123", () => {
    const invalidData = "1234567";

    expect(() => new Id(invalidData)).toThrow();
  });

  test("Ids should be equal", () => {
    const validData = "12345678";

    const id1 = new Id(validData);
    const id2 = new Id(validData);

    expect(Id.equal(id1, id2)).toBe(true);
  });
});
