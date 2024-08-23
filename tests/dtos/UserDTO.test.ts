import { UserDTO } from "../../src/dtos/UserDTO";

describe("UserDTO", () => {
  test("Validate UserDTO should not throw an Error", () => {
    new UserDTO({
      id: "1",
      role: "client"
    });
  });
  test("Validate UserDTO should throw an Error id is a required field", () => {
    expect(() =>
      new UserDTO({
        role: "client"
      })).toThrow();
  });
  test("Validate UserDTO should throw an Error Unknown role", () => {
    expect(() =>
      new UserDTO({
        id: "1"
      })).toThrow();
  });
  test("Validate UserDTO should throw an Error Unknown role", () => {
    expect(() =>
      new UserDTO({
        id: "1",
        role: "qwe"
      })).toThrow();
  });
});
