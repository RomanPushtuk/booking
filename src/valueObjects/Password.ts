import * as yup from "yup";
import * as crypto from "crypto";
import { PasswordValidationError } from "../errors/PasswordValidationError";
import { passwordRegex } from "../constants/passwordRegex";

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

  static encrypt(password: string): string {
    return crypto.hash("sha1", password);
  }

  static validate(value: string) {
    const emailSchema = yup.string().matches(passwordRegex).min(6).max(123);
    emailSchema.validateSync(value);
  }
}
