import * as yup from "yup";
import * as crypto from "crypto";
import { PasswordValidationError } from "../errors/PasswordValidationError";
import { PASSWORD_REGEX } from "../constants/PASSWORD_REGEX";

export class Password {
  readonly value: string;

  constructor(value: string) {
    try {
      if (Password.isValidSHA1(value)) {
        this.value = value;
        return;
      }
      Password.validate(value);
      this.value = Password.encrypt(value);
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

  static isValidSHA1(hash: string): boolean {
    return Boolean(hash.match(/^[a-fA-F0-9]{40}$/));
  }

  static validate(value: string) {
    const emailSchema = yup.string().matches(PASSWORD_REGEX).min(6).max(123);
    emailSchema.validateSync(value);
  }
}
