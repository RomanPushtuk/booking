import yup from "yup";

export const createHostDtoSchema = yup.object({
  id: yup.string().required(),
  workHours: yup.array().of(
    yup
      .object({
        from: yup.string().required(),
        to: yup.string().required(),
      })
      .required(),
  ),
  workDays: yup.array().of(yup.string()).required(),
  forwardBooking: yup.string().required(),
});
