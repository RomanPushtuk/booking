import * as yup from "yup";

export const createClientDtoSchema = yup.object({
  id: yup.string().required(),
});
