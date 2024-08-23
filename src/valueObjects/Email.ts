import * as yup from "yup";
import { EmailValidationError } from "../errors/EmailValidationError";

export class Email {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
    try {
      Email.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new EmailValidationError();
    }
  }

  public static validate(value: string) {
    const emailSchema = yup.string().email().max(123);
    emailSchema.validateSync(value);
  }
}
