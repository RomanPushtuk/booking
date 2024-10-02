import { Knex } from "knex";
import { db } from "../../db";

interface BookingDbModel {
  id: string;
  clientId: string;
  hostId: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  isСanceled: boolean;
  isDeleted: boolean;
}

export const saveBooking = (bookingModel: BookingDbModel): Knex.SqlNative => {
  return db("bookings")
    .insert(bookingModel)
    .onConflict("id")
    .merge()
    .toSQL()
    .toNative();
};
