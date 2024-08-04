import { createHostDtoSchema } from "../validationSchemas/createHostDtoSchema";

export class CreateHostDTO {
  id: string;
  forwardBooking: string;
  workHours: Array<{ from: string; to: string }>;
  workDays: Array<string>;

  constructor(data: any) {
    this.id = data.id;
    this.workHours = data.workHours;
    this.workDays = data.workDays;
    this.forwardBooking = data.forwardBooking;

    try {
      createHostDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new Error("CreateHostDTO validation error");
    }
  }
}
