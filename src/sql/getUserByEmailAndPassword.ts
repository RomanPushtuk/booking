import { Knex } from "knex";
import { db } from "../../db";

export const getUserByEmailAndPassword = (data: {
  email: string;
  password: string;
}): Knex.SqlNative => {
  const { email, password } = data;
  return db("users").select("*").where({ email, password }).toSQL().toNative();
};
