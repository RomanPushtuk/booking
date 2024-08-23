import * as yup from "yup";

export const workHoursSchema = yup
  .array()
  .of(
    yup
      .object()
      .shape({
        from: yup.string().required(),
        to: yup.string().required(),
      })
      .required(),
  )
  .required();
