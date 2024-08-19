import { bookingDtoSchema } from "../validationSchemas/bookingDtoSchema";

export class BookingDTO {
  id: string;
  clientId: string;
  hostId: string;
  date: string;
  time: { from: string; to: string };

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
      throw new Error("BookingDTO validation error");
    }
  }
}
