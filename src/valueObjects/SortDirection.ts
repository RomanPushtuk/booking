import * as yup from "yup";
import { SortDirectionValidationError } from "../errors/SortDirectionValidationError";

export class SortDirection {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
    try {
      SortDirection.validate(this.value);
    } catch (err) {
      console.log(err);
      throw new SortDirectionValidationError();
    }
  }

  public static validate(value: string) {
    const emailSchema = yup
      .string()
      .test(
        "SortDirection",
        "value can be only 'desc' or 'asc'",
        (value) => value === "desc" || value === "asc",
      );
    emailSchema.validateSync(value);
  }
}
