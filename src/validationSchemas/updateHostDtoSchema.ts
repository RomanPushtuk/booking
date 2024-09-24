import * as yup from "yup";

export const updateHostDtoSchema = yup.object().shape({
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
    .notRequired(),
  workDays: yup.array().of(yup.string()).notRequired(),
});
