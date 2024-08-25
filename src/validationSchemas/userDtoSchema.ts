import * as yup from "yup";
import { roleSchema } from "./roleSchema";
import { idSchema } from "./idSchema";

export const userDtoSchema = yup.object().shape({
  id: idSchema,
  email: yup.string().required(),
  password: yup.string().required(),
  role: roleSchema,
});
