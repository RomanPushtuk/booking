import { Id } from "../valueObjects/Id";
import { Timestamp } from "../../src/valueObjects/Timestamp";

export class BookingFilters {
  public readonly clientId?: Id;
  public readonly hostId?: Id;
  public readonly dateTimeFrom?: Timestamp;
  public readonly dateTimeTo?: Timestamp;

  constructor(data: {
    clientId?: string;
    hostId?: string;
    dateTimeFrom?: string;
    dateTimeTo?: string;
  }) {
    const { clientId, hostId, dateTimeFrom, dateTimeTo } = data;

    this.clientId = clientId ? new Id(clientId) : undefined;
    this.hostId = hostId ? new Id(hostId) : undefined;
    this.dateTimeFrom = dateTimeFrom ? new Timestamp(dateTimeFrom) : undefined;
    this.dateTimeTo = dateTimeTo ? new Timestamp(dateTimeTo) : undefined;
  }
}
