import yup from "yup";

export const updateBookingDTOSchema = yup.object({
  id: yup.string().required(),
  date: yup.string(),
  time: yup.object().shape({
    from: yup.string().required(),
    to: yup.string().required(),
  }),
});