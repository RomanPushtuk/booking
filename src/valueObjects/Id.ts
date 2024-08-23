import { IdValidationError } from "../errors/IdValidationError";
import { idSchema } from "../validationSchemas/idSchema";

export class Id {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
    try {
      Id.validate(this.value);
    } catch (e) {
      console.log(e);
      throw new IdValidationError();
    }
  }

  static validate(value: string) {
    idSchema.validateSync(value);
  }

  static equal(id1: Id, id2: Id): boolean {
    return id1.value === id2.value;
  }
}
