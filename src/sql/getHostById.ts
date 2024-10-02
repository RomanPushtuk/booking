import { Knex } from "knex";
import { db } from "../../db";

export const getHostById = (data: { id: string }): Knex.SqlNative => {
  const { id } = data;
  return db("hosts").where("id", id).toSQL().toNative();
};
