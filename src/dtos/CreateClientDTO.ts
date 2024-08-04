import { createClientDtoSchema } from "../validationSchemas/createClientDtoSchema";

export class CreateClientDTO {
  id: string;

  constructor(data: any) {
    this.id = data.id;

    try {
      createClientDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new Error("CreateClientDTO validation error");
    }
  }
}
