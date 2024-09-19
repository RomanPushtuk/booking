import moment from "moment";
import { Id } from "../valueObjects/Id";
import { HoursMinutes } from "../valueObjects/HoursMinutes";

export class BookingFilters {
  public readonly clientId?: Id;
  public readonly hostId?: Id;
  public readonly dateFrom?: moment.Moment;
  public readonly dateTo?: moment.Moment;
  public readonly timeFrom?: HoursMinutes;
  public readonly timeTo?: HoursMinutes;

  constructor(
    clientId?: string,
    hostId?: string,
    dateFrom?: string,
    dateTo?: string,
    timeFrom?: string,
    timeTo?: string,
  ) {
    this.clientId = clientId ? new Id(clientId) : undefined;
    this.hostId = hostId ? new Id(hostId) : undefined;
    this.dateFrom = dateFrom ? moment(dateFrom) : undefined;
    this.dateTo = dateTo ? moment(dateTo) : undefined;
    this.timeFrom = timeFrom ? new HoursMinutes(timeFrom) : undefined;
    this.timeTo = timeTo ? new HoursMinutes(timeTo) : undefined;
  }
}
