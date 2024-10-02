import { Knex } from "knex";
import { db } from "../../db";

interface ClientDbModel {
  id: string;
  isDeleted: boolean;
}

export const saveClient = (clientModel: ClientDbModel): Knex.SqlNative => {
  return db("clients")
    .insert(clientModel)
    .onConflict("id")
    .merge()
    .toSQL()
    .toNative();
};
