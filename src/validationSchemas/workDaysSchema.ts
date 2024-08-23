import * as yup from "yup";

export const workDaysSchema = yup.array().of(yup.string()).required();
