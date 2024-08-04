import yup from "yup";

export const createBookingDTOSchema = yup.object({
  clientId: yup.string().required(),
  hostId: yup.string().required(),
  date: yup.string().required(),
  time: yup.object().shape({
    from: yup.string().required(),
    to: yup.string().required(),
  }),
});
