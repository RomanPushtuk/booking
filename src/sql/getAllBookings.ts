import { BookingFilters } from "../application/BookingFilters";
import { BookingSorting } from "../application/BookingSorting";

export const getAllBookings = (data: {
  sorting?: BookingSorting;
  filters?: BookingFilters;
}): string => {
  const { sorting, filters } = data;

  let orderBySql = "";
  let filtersSql: string[] = [];

  if (sorting) {
    orderBySql += `ORDER BY \`${sorting.property}\` ${sorting.direction.value}`;
  }

  if (filters) {
    if (filters.clientId) {
      filtersSql.push(`\`clientId\` = '${filters.clientId.value}'`);
    }
    if (filters.hostId) {
      filtersSql.push(`\`hostId\` = '${filters.hostId.value}'`);
    }
    if (filters.dateTimeFrom) {
      filtersSql.push(`\`dateTimeFrom\` >= '${filters.dateTimeFrom.value}'`);
    }
    if (filters.dateTimeTo) {
      filtersSql.push(`\`dateTimeTo\` <=  '${filters.dateTimeTo.value}'`);
    }

    filtersSql = filtersSql.map((statement, index) => {
      if (index === 0) return "where " + statement;
      return "and " + statement;
    });
  }

  return `select * from \`bookings\` ${filtersSql.join(" ")} ${orderBySql};`;
};
