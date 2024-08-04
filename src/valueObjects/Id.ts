import * as yup from "yup";

export class Id {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
    Id.validate(this.value);
  }

  static validate(value: string) {
    const idSchema = yup.string().max(8);
    idSchema.validateSync(value);
  }
}
