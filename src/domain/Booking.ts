import { BookingDTO } from "../dtos/BookingDTO";
import { WorkPeriod } from "../valueObjects/WorkPeriod";
import moment, { Moment } from "moment";
import { UpdateBookingDTO } from "../dtos/UpdateBookingDTO";
import { Id } from "../valueObjects/Id";
import { nanoid } from "nanoid";
import { Date } from "../valueObjects/Date";
import { HoursMinutes } from "../valueObjects/HoursMinutes";

export class Booking {
  readonly id: Id;
  clientId: string;
  hostId: string;
  date: Date;
  time: WorkPeriod;

  canceled: boolean;
  deleted: boolean;

  invisible: boolean;

  private constructor(
    id: Id,
    clientId: string,
    hostId: string,
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
    const id = new Id(nanoid(8));
    const clientId = data.clientId;
    const hostId = data.hostId;
    const date = new Date(data.date);
    const time = new WorkPeriod(
      new HoursMinutes(data.time.from),
      new HoursMinutes(data.time.to),
    );
    const canceled = data.canceled;
    const deleted = data.deleted;

    return new Booking(id, clientId, hostId, date, time, canceled, deleted);
  }

  public getProperties(): BookingDTO {
    throw new Error("Method not implemented.");
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