import { bookingDtoSchema } from "../validationSchemas/bookingDtoSchema";
import { BookingDTOValidationError } from "../errors/BookingDTOValidationError";

export class BookingDTO {
  readonly id: string;
  readonly clientId: string;
  readonly hostId: string;
  readonly date: string;
  readonly time: { from: string; to: string };

  constructor(data: any) {
    this.id = data.id;
    this.clientId = data.clientId;
    this.hostId = data.hostId;
    this.date = data.date;
    this.time = data.time;

    try {
      bookingDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new BookingDTOValidationError();
    }
  }
}
