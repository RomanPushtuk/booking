import { BookingDTO } from "../dtos/BookingDTO";
import { WorkPeriod } from "../application/WorkPeriod";
import moment, { Moment } from "moment";
import { UpdateBookingDTO } from "../dtos/UpdateBookingDTO";
import { Id } from "../valueObjects/Id";
import { Date } from "../valueObjects/Date";
import { HoursMinutes } from "../valueObjects/HoursMinutes";

interface IBookingProperties {
  id: string;
  clientId: string;
  hostId: string;
  date: string;
  time: { from: string; to: string };
  canceled: boolean;
  deleted: boolean;
}

export class Booking {
  readonly id: Id;
  clientId: Id;
  hostId: Id;
  date: Date;
  time: WorkPeriod;

  canceled: boolean;
  deleted: boolean;

  invisible: boolean;

  private constructor(
    id: Id,
    clientId: Id,
    hostId: Id,
    date: Date,
    time: WorkPeriod,
    canceled: boolean,
    deleted: boolean,
  ) {
    this.id = id;
    this.clientId = clientId;
    this.hostId = hostId;
    this.date = date;
    this.time = time;
    this.canceled = canceled;
    this.deleted = deleted;
    this.invisible = false;
  }

  public getDateTimePeriod(): { from: Moment; to: Moment } {
    const fromDateTime = moment([
      this.date.year,
      this.date.month,
      this.date.day,
      this.time.from.hours,
      this.time.from.minutes,
    ]);

    const toDateTime = moment([
      this.date.year,
      this.date.month,
      this.date.day,
      this.time.to.hours,
      this.time.to.minutes,
    ]);

    return { from: fromDateTime, to: toDateTime };
  }

  static fromDTO(data: BookingDTO): Booking {
    const id = new Id(data.id);
    const clientId = new Id(data.clientId);
    const hostId = new Id(data.hostId);
    const date = new Date(data.date);
    const time = new WorkPeriod(
      new HoursMinutes(data.time.from),
      new HoursMinutes(data.time.to),
    );
    const canceled = false;
    const deleted = false;

    return new Booking(id, clientId, hostId, date, time, canceled, deleted);
  }

  public getProperties(): IBookingProperties {
    const time = this.time;

    return {
      id: this.id.value,
      clientId: this.clientId.value,
      hostId: this.hostId.value,
      date: this.date.value,
      time: {
        from: time.from.getHoursMinutesWithSeconds(),
        to: time.to.getHoursMinutesWithSeconds(),
      },
      canceled: this.canceled,
      deleted: this.deleted,
    };
  }

  public update(data: UpdateBookingDTO) {
    this.date = data.date ? new Date(data.date) : this.date;
    this.time = data.time
      ? new WorkPeriod(
          new HoursMinutes(data.time.from),
          new HoursMinutes(data.time.to),
        )
      : this.time;

    this.invisible = true;
  }
}
