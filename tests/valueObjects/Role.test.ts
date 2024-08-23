import { Role } from "../../src/valueObjects/Role";
import { Roles } from "../../src/enums/Roles";

describe("Role Value Object", () => {
  test("Valid Role Value Object should not throw an Error", () => {

    expect(() => new Role(Roles.HOST)).not.toThrow();
    expect(() => new Role(Roles.CLIENT)).not.toThrow();

  });
  test("Roles should be equal", () => {

    const role1 = new Role(Roles.HOST);
    const role2 = new Role(Roles.HOST);

    expect(Role.equal(role1, role2)).toBe(true);
  });

  test("Invalid Role Value Object should not throw an Error", () => {
    expect(() => new Role("myRole")).toThrow();
  });


});
