import * as yup from "yup";
import { idSchema } from "./idSchema";
import { forwardBookingSchema } from "./forwardBookingSchema";
import { workHoursSchema } from "./workHoursSchema";
import { workDaysSchema } from "./workDaysSchema";

export const hostDtoSchema = yup.object().shape({
  id: idSchema,
  forwardBooking: forwardBookingSchema,
  workHours: workHoursSchema,
  workDays: workDaysSchema,
});
