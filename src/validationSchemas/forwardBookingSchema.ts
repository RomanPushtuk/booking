import { object, number, string } from "yup";
import { ForwardBookingPeriods } from "../enums/ForwardBookingPeriods";

export const forwardBookingSchema = object({
  count: number().required().integer().min(0),
  days: string()
    .required()
    .test("", "", (value) =>
      Object.values(ForwardBookingPeriods).includes(Number(value)),
    ),
});
