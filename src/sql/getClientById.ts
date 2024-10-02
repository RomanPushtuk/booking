import { Knex } from "knex";
import { db } from "../../db";

export const getClientById = (data: { id: string }): Knex.SqlNative => {
  const { id } = data;
  return db("clients").where("id", id).toSQL().toNative();
};
