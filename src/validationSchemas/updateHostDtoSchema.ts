import * as yup from "yup";

export const updateHostDtoSchema = yup.object().shape({
  id: yup.string().required(),
  forwardBooking: yup.string().notRequired(),
  workHours: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          from: yup.string().required(),
          to: yup.string().required(),
        })
        .notRequired(),
    )
    .required(),
  workDays: yup.array().of(yup.string()).notRequired(),
});