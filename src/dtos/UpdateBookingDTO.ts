import { updateBookingDTOSchema } from "../validationSchemas/updateBookingDTOSchema";
import { UpdateBookingDTOValidationError } from "../errors/UpdateBookingDTOValidationError";

export class UpdateBookingDTO {
  readonly id: string;
  readonly date?: string;
  readonly time?: { from: string; to: string };

  constructor(data: any) {
    this.id = data.id;
    this.date = data.date;
    this.time = data.time;

    try {
      updateBookingDTOSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new UpdateBookingDTOValidationError();
    }
  }
}
