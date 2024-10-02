import { Knex } from "knex";
import { db } from "../../db";

interface UserDbModel {
  id: string;
}

export const saveUser = (clientModel: UserDbModel): Knex.SqlNative => {
  return db("users")
    .insert(clientModel)
    .onConflict("id")
    .merge()
    .toSQL()
    .toNative();
};
