import { updateHostDtoSchema } from "../validationSchemas/updateHostDtoSchema";
import { UpdateBookingDTOValidationError } from "../errors/UpdateBookingDTOValidationError";

export class UpdateHostDTO {
  workHours?: Array<{ from: string; to: string }>;
  workDays?: Array<string>;

  constructor(data: any) {
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
