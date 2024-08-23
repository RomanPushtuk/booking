import { hostDtoSchema } from "../validationSchemas/hostDtoSchema";
import { updateHostDtoSchema } from "../validationSchemas/updateHostDtoSchema";

export class UpdateHostDTO {
  id: string;
  forwardBooking: string;
  workHours: Array<{ from: string; to: string }>;
  workDays: Array<string>;

  constructor(data: any) {
    this.id = data.id;
    this.forwardBooking = data.forwardBooking;
    this.workHours = data.workHours;
    this.workDays = data.workDays;
    try {
      updateHostDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new Error("UpdateHostDTO validation error");
    }
  }
}
