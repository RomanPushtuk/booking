import { createBookingDTOSchema } from "../validationSchemas/createBookingDTOSchema";
import { CreateBookingDTOValidationError } from "../errors/CreateBookingDTOValidationError";

export class CreateBookingDTO {
  hostId: string;
  date: string;
  time: { from: string; to: string };

  constructor(data: any) {
    this.hostId = data.hostId;
    this.date = data.date;
    this.time = data.time;

    try {
      createBookingDTOSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new CreateBookingDTOValidationError();
    }
  }
}
