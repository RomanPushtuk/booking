import { LoginUserDTOValidationError } from "../errors/LoginUserDTOValidationError";
import { loginUserDtoSchema } from "../validationSchemas/loginUserDtoSchema";

export class LoginUserDTO {
  readonly email: string;
  readonly password: string;

  constructor(data: any) {
    this.email = data.email;
    this.password = data.password;

    try {
      loginUserDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new LoginUserDTOValidationError();
    }
  }
}
