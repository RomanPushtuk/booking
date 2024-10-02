import { Knex } from "knex";
import { db } from "../../db";
import { BookingFilters } from "../application/BookingFilters";
import { BookingSorting } from "../application/BookingSorting";

export const getAllBookings = (data: {
  sorting?: BookingSorting;
  filters?: BookingFilters;
}): Knex.SqlNative => {
  const queryBuilder = db("bookings");

  const { sorting, filters } = data;

  if (sorting) {
    queryBuilder.orderBy(sorting.property, sorting.direction.value);
  }

  if (filters) {
    if (filters.clientId) {
      queryBuilder.where("clientId", filters.clientId.value);
    }

    if (filters.hostId) {
      queryBuilder.where("hostId", filters.hostId.value);
    }

    if (filters.dateFrom) {
      queryBuilder.whereRaw(
        `date(date) >= '${filters.dateFrom.format("YYYY-MM-DD")}'`,
      );
    }

    if (filters.dateTo) {
      queryBuilder.whereRaw(
        `date(date) <= '${filters.dateTo.format("YYYY-MM-DD")}'`,
      );
    }

    if (filters.timeFrom) {
      queryBuilder.whereRaw(`time(timeFrom) >= '${filters.timeFrom.value}'`);
    }

    if (filters.timeTo) {
      queryBuilder.whereRaw(`time(timeTo) <= '${filters.timeTo.value}'`);
    }
  }

  return queryBuilder.toSQL().toNative();
};
