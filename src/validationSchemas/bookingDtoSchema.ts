import * as yup from "yup";

export const bookingDtoSchema = yup.object().shape({
  id: yup.string().required(),
  clientId: yup.string().required(),
  hostId: yup.string().required(),
  date: yup.string().required(),
  time: yup.object().shape({
    from: yup.string().required(),
    to: yup.string().required(),
  }),
});
