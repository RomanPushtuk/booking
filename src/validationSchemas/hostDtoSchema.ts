import * as yup from "yup";
import { idSchema } from "./idSchema";
import { workHoursSchema } from "./workHoursSchema";
import { workDaysSchema } from "./workDaysSchema";

export const hostDtoSchema = yup.object().shape({
  id: idSchema,
  forwardBooking: yup.string().required(),
  workHours: workHoursSchema,
  workDays: workDaysSchema,
});
