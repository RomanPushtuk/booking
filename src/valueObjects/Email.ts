import yup from "yup";

export class Email {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
    try {
      Email.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

  public static validate(value: string) {
    const emailSchema = yup.string().email();
    emailSchema.validateSync(value);
  }
}
