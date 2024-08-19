export class BookingFilters {
  clientId: string;
  hostId: string;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;
  constructor(
    clientId: string,
    hostId: string,
    dateFrom: string,
    dateTo: string,
    timeFrom: string,
    timeTo: string,
  ) {
    this.clientId = clientId;
    this.hostId = hostId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.timeFrom = timeFrom;
    this.timeTo = timeTo;
  }
}
