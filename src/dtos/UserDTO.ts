import { userDtoSchema } from "../validationSchemas/userDtoSchema";
import { UserDTOValidationError } from "../errors/UserDTOValidationError";

export class UserDTO {
  id: string;
  email: string;
  password: string;
  role: string;

  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    try {
      userDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new UserDTOValidationError();
    }
  }
}
