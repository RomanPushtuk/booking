import { createHostDtoSchema } from "../validationSchemas/createHostDtoSchema";
import { CreateHostDTOValidationError } from "../errors/CreateHostDTOValidationError";

export class CreateHostDTO {
  forwardBooking: string;
  workHours: Array<{ from: string; to: string }>;
  workDays: Array<string>;

  constructor(data: any) {
    this.workHours = data.workHours;
    this.workDays = data.workDays;
    this.forwardBooking = data.forwardBooking;

    try {
      createHostDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new CreateHostDTOValidationError();
    }
  }
}
