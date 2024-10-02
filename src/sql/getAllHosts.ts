import { Knex } from "knex";
import { db } from "../../db";

export const getAllHosts = (): Knex.SqlNative => {
  return db("hosts").select("*").toSQL().toNative();
};
