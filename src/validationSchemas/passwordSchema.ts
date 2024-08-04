import * as yup from "yup";

export const passwordSchema = yup.string().min(8).max(32);
