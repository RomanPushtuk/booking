import yup from "yup";

export class Password {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
    try {
      Password.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

  public static validate(value: string) {
    const emailSchema = yup.string().min(8);
    emailSchema.validateSync(value);
  }
}
