import { createUserDtoSchema } from "../validationSchemas/createUserDtoSchema";

export class CreateUserDTO {
  readonly email: string;
  readonly password: string;
  readonly role: string;

  constructor(data: any) {
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;

    try {
      createUserDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new Error("CreateUserDTO validation error");
    }
  }
}
