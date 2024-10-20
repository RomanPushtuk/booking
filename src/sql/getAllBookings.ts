import { BookingFilters } from "../application/BookingFilters";
import { BookingSorting } from "../application/BookingSorting";

export const getAllBookings = (data: {
  sorting?: BookingSorting;
  filters?: BookingFilters;
}): string => {
  const { sorting, filters } = data;

  let orderBySql = "";
  let filtersSql = "";

  if (sorting) {
    orderBySql += `ORDER BY \`${sorting.property}\` ${sorting.direction.value}`;
  }

  if (filters) {
    if (filters.clientId) {
      filtersSql += `WHERE \`clientId\` = '${filters.clientId.value}'`;
    }

    if (filters.hostId) {
      filtersSql += `AND WHERE \`hostId\` = '${filters.hostId.value}'`;
    }

    if (filters.dateFrom) {
      filtersSql += `AND WHERE date(\`date\`) >= '${filters.dateFrom.format("YYYY-MM-DD")}}'`;
    }

    if (filters.dateTo) {
      filtersSql += `AND WHERE date(\`date\`) <=  '${filters.dateTo.format("YYYY-MM-DD")}}'`;
    }

    if (filters.timeFrom) {
      filtersSql += `AND WHERE time(\`timeFrom\`) >= '${filters.timeFrom.value}}'`;
    }

    if (filters.timeTo) {
      filtersSql += `AND WHERE time(\`timeTo\`)  <= '${filters.timeTo.value}}'`;
    }
  }

  return `select * from \`bookings\` ${filtersSql} ${orderBySql};`;
};
