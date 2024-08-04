import { createBookingDTOSchema } from "../validationSchemas/CreateBookingDTOSchema";

export class CreateBookingDTO {
  clientId: string;
  hostId: string;
  date: string;
  time: { from: string; to: string };

  constructor(data: any) {
    this.clientId = data.clientId;
    this.hostId = data.hostId;
    this.date = data.date;
    this.time = data.timePeriod;

    try {
      createBookingDTOSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new Error("CreateBookingDTO validation error");
    }
  }
}
