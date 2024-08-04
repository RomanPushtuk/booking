import * as yup from "yup";
import { Roles } from "../enums/Roles";

export const roleSchema = yup
  .string()
  .test("role test", "Unknown role", (value = "") =>
    Object.values<string>(Roles).includes(value),
  );
