import { roleSchema } from "../validationSchemas/roleSchema";
import { RoleValidationError } from "../errors/RoleValidationError";

export class Role {
  value: string;

  constructor(value: string) {
    this.value = value;
    try {
      Role.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new RoleValidationError();
    }
  }

  static validate(value: string) {
    roleSchema.validateSync(value);
  }

  static equal(role1: Role, role2: Role): boolean {
    return role1.value === role2.value;
  }

}
