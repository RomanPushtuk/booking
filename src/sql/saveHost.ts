import { Knex } from "knex";
import { db } from "../../db";

interface HostDbModel {
  id: string;
  forwardBooking: string;
  workHours: string;
  workDays: string;
  isDeleted: boolean;
}

export const saveHost = (clientModel: HostDbModel): Knex.SqlNative => {
  return db("hosts")
    .insert(clientModel)
    .onConflict("id")
    .merge()
    .toSQL()
    .toNative();
};
