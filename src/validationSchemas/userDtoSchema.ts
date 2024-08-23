import * as yup from "yup";
import { roleSchema } from "./roleSchema";
import { idSchema } from "./idSchema";

export const userDtoSchema = yup.object().shape({
  id: idSchema,
  role: roleSchema,
});
