import { updateHostDtoSchema } from "../validationSchemas/updateHostDtoSchema";
import { UpdateBookingDTOValidationError } from "../errors/UpdateBookingDTOValidationError";

export class UpdateHostDTO {
  forwardBooking?: string;
  workHours?: Array<{ from: string; to: string }>;
  workDays?: Array<string>;

  constructor(data: any) {
    this.forwardBooking = data.forwardBooking;
    this.workHours = data.workHours;
    this.workDays = data.workDays;
    try {
      updateHostDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new UpdateBookingDTOValidationError();
    }
  }
}
