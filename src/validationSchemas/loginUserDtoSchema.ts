import * as yup from "yup";
import { emailSchema } from "./emailSchema";
import { passwordSchema } from "./passwordSchema";

export const loginUserDtoSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});
