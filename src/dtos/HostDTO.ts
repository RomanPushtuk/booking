import { hostDtoSchema } from "../validationSchemas/hostDtoSchema";

export class HostDTO {
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
      hostDtoSchema.validateSync(this);
    } catch (err) {
      console.log(err);
      throw new Error("CreateHostDTO validation error");
    }
  }
}
