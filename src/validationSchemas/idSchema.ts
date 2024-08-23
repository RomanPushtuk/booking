import * as yup from "yup";

export const idSchema = yup.string().length(8).required();
