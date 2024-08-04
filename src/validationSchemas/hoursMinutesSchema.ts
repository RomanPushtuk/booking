import { object, number } from "yup";

export const hoursMinutesSchema = object({
  hours: number().required().integer().min(0).max(23),
  minutes: number().required().integer().min(0).max(59),
});
