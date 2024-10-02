import { Knex } from "knex";
import { db } from "../../db";

export const getBookingById = (data: { id: string }): Knex.SqlNative => {
  const { id } = data;
  return db("bookings").where("id", id).toSQL().toNative();
};
