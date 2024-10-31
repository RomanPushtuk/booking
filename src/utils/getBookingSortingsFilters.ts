import { BookingFilters } from "../application/BookingFilters";
import { BookingSorting } from "../application/BookingSorting";
import { Date } from "../valueObjects/Date";
import { HoursMinutes } from "../valueObjects/HoursMinutes";
import { Timestamp } from "../valueObjects/Timestamp";

export const getBookingSortingsFilters = (
  clientId: string = "",
  hostId: string = "",
  sortDirection: string = "desc",
  sortProperty: string = "dateTimeFrom",
  dateFrom?: string,
  dateTo?: string,
  timeFrom?: string,
  timeTo?: string,
) => {
  const dateFromVO = dateFrom ? new Date(dateFrom).value : undefined;
  const dateToVO = dateTo ? new Date(dateTo).value : undefined;
  const timeFromVO = timeFrom
    ? new HoursMinutes(timeFrom).getHoursMinutesWithSeconds()
    : undefined;
  const timeToVO = timeTo
    ? new HoursMinutes(timeTo).getHoursMinutesWithSeconds()
    : undefined;

  const dateTimeFrom =
    !!dateFromVO && !!timeFromVO
      ? new Timestamp(dateFromVO + " " + timeFromVO).value
      : undefined;
  const dateTimeTo =
    !!dateToVO && !!timeToVO
      ? new Timestamp(dateToVO + " " + timeToVO).value
      : undefined;

  const sorting = new BookingSorting(sortDirection, sortProperty);
  const filters = new BookingFilters({
    clientId,
    hostId,
    dateTimeFrom,
    dateTimeTo,
  });

  return { sorting, filters };
};
