import * as yup from "yup";
import { emailSchema } from "./emailSchema";
import { passwordSchema } from "./passwordSchema";
import { roleSchema } from "./roleSchema";

export const createUserDtoSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
});
