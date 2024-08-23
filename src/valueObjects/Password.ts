import * as yup from "yup";
import { PasswordValidationError } from "../errors/PasswordValidationError";
import bcrypt from "bcrypt";

export class Password {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
    try {
      Password.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new PasswordValidationError();
    }
  }

  static equal(password1: Password, password2: Password): boolean {

    return password1.value === password2.value;

  }

  static encrypt(password: Password) { //TODO not sure if made it as you wanted
    const salt = 7;
    return bcrypt.hashSync(password.value, salt);
  }

  static verify(password: Password, hashedPassword: string): boolean {
    return bcrypt.compareSync(password.value, hashedPassword);
  }

  static validate(value: string) {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/; //check if string includes numbers,letters,capital letters

    const emailSchema = yup.string().matches(passwordRegex).min(6).max(123);
    emailSchema.validateSync(value);
  }
}
