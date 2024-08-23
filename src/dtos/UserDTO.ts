import { userDtoSchema } from "../validationSchemas/userDtoSchema";

export class UserDTO {
  id: string;
  role: string;
  constructor(data: any) {
    this.id = data.id;
    this.role = data.role;

    try {
      userDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new Error("UserDTO validation error");
    }
  }
}
