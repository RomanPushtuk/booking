import * as yup from "yup";

export const createBookingDTOSchema = yup.object().shape({
  hostId: yup.string().required(),
  date: yup.string().required(),
  time: yup
    .object()
    .shape({
      from: yup.string().required(),
      to: yup.string().required(),
    })
    .required(),
});
