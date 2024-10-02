import moment from "moment";
import { BookingCanceledByClientEvent } from "../events/BookingCanceledByClientEvent";
import { BookingCanceledByHostEvent } from "../events/BookingCanceledByHostEvent";
import { BookingCreatedEvent } from "../events/BookingCreatedEvent";
import { BookingUpdatedEvent } from "../events/BookingUpdatedEvent";
import { ForwardBooking } from "../valueObjects/ForwardBooking";
import { HoursMinutes } from "../valueObjects/HoursMinutes";
import { Id } from "../valueObjects/Id";
import { Weekday } from "../valueObjects/Weekday";
import { WorkPeriod } from "../application/WorkPeriod";
import { AggregateRoot } from "./AggregateRoot";
import { Booking } from "./Booking";
import { UpdateBookingDTO } from "../dtos/UpdateBookingDTO";
import { HostDTO } from "../dtos/HostDTO";
import { DeletingDeletedHostError } from "../errors/DeletingDeletedHostError";
import { WorkHours } from "../application/WorkHours";
import { WorkDays } from "../application/WorkDays";

interface IHostProperties {
  id: string;
  forwardBooking: string;
  workHours: Array<{ from: string; to: string }>;
  workDays: Array<string>;
  deleted: boolean;
}

export class Host extends AggregateRoot {
  readonly id: Id;
  private _upcomingBookings: Array<Booking>;
  private _forwardBooking: ForwardBooking;
  private _workHours: WorkHours;
  private _workDays: WorkDays;
  private _deleted: boolean = false;

  private constructor(
    id: Id,
    upcomingBookings: Array<Booking>,
    forwardBooking: ForwardBooking,
    workHours: WorkHours,
    workDays: WorkDays,
  ) {
    super();
    this.id = id;
    this._upcomingBookings = upcomingBookings;
    this._forwardBooking = forwardBooking;
    this._workHours = workHours;
    this._workDays = workDays;
  }

  public setWorkHours(workHours: WorkHours) {
    this._workHours = workHours;
  }

  public setWorkDays(workDays: WorkDays) {
    this._workDays = workDays;
  }

  public setIsDeleted(flag: boolean) {
    if (this._deleted === true) {
      throw new DeletingDeletedHostError();
    }
    this._deleted = flag;
  }

  public setUpcomingBookings(upcomingBookings: Booking[]) {
    this._upcomingBookings = upcomingBookings;
  }

  public getUpcomingBookings(): Array<Booking> {
    return this._upcomingBookings;
  }

  static fromDTO(data: HostDTO): Host {
    const id = new Id(data.id);
    const upcomingBookings: Array<Booking> = [];
    const forwardBooking = new ForwardBooking(data.forwardBooking);
    const workHours = new WorkHours(
      data.workHours.map(
        ({ from, to }) =>
          new WorkPeriod(new HoursMinutes(from), new HoursMinutes(to)),
      ),
    );
    const workDays = new WorkDays(
      data.workDays.map((item) => new Weekday(item)),
    );

    return new Host(id, upcomingBookings, forwardBooking, workHours, workDays);
  }

  public getProperties(): IHostProperties {
    const workHours = this._workHours.getWorkHours();
    const workDays = this._workDays.getWorkDays();

    return {
      id: this.id.value,
      forwardBooking: this._forwardBooking.value,
      workHours: workHours.map(({ from, to }) => ({
        from: from.value,
        to: to.value,
      })),
      workDays: workDays.map((item) => item.value),
      deleted: this._deleted,
    };
  }

  private checkIfExistOverlapingBooking = (
    booking: Booking,
    bookings: Array<Booking>,
  ): boolean => {
    const { from: from1, to: to1 } = booking.getDateTimePeriod();
    for (const b of bookings) {
      const { from: from2, to: to2 } = b.getDateTimePeriod();

      if (
        (from2.isSameOrAfter(from1) && from2.isSameOrBefore(to1)) ||
        (to2.isSameOrAfter(from1) && to2.isSameOrBefore(to1))
      )
        return true;
    }
    return false;
  };

  private checkIfLessThan10MinutesBeforeBookingStarts = (
    booking: Booking,
  ): boolean => {
    const now = moment();
    const bookingFrom = booking.getDateTimePeriod().from;
    if (bookingFrom.diff(now, "minutes") < 10) return true;
    return false;
  };

  private checkIfBookingInThePast = (booking: Booking): boolean => {
    const now = moment(global.Date.now());
    const bookingDateTime = moment(
      booking.date.value + " " + booking.time.from.value,
      "YYYY-MM-DD hh:mm",
    );

    if (bookingDateTime.diff(now, "minutes") < 0) return true;

    return false;
  };

  private checkIfHostHasBooking = (booking: Booking): boolean => {
    const findBooking = this._upcomingBookings.find(
      (upcomingBooking) => upcomingBooking === booking,
    );
    if (findBooking) return true;
    return false;
  };

  public addBooking(booking: Booking) {
    if (this.checkIfBookingInThePast(booking)) {
      throw new Error("It is not possible to create a booking for a past date");
    }

    if (this.checkIfExistOverlapingBooking(booking, this._upcomingBookings)) {
      throw new Error("Host has booking on this date and time");
    }

    this._upcomingBookings.push(booking);
    this.dispatch(new BookingCreatedEvent(booking.clientId.value));
  }

  public updateBooking(booking: Booking, data: UpdateBookingDTO) {
    if (this.checkIfHostHasBooking(booking)) {
      throw new Error("The host does not have this upcoming booking");
    }

    booking.update(data);

    if (this.checkIfBookingInThePast(booking)) {
      throw new Error("It is not possible to create a booking for a past date");
    }

    if (this.checkIfExistOverlapingBooking(booking, this._upcomingBookings)) {
      throw new Error("Host has booking on this date and time");
    }

    this.dispatch(new BookingUpdatedEvent(booking.clientId.value));
  }

  public cancelBookingByClient(booking: Booking, clientId: string) {
    if (this.checkIfHostHasBooking(booking)) {
      throw new Error("The host does not have this upcoming booking");
    }

    if (booking.clientId.value !== clientId) {
      throw new Error("This booking cannot be cancelled by this client");
    }

    if (this.checkIfLessThan10MinutesBeforeBookingStarts(booking)) {
      throw new Error(
        "The client cannot cancel the booking, as it is less than 10 minutes before it starts",
      );
    }

    booking.canceled = true;
    this.dispatch(new BookingCanceledByClientEvent(clientId));
  }

  public cancelBookingByHost(booking: Booking, hostId: string) {
    if (this.checkIfHostHasBooking(booking)) {
      throw new Error("The host does not have this upcoming booking");
    }

    if (booking.hostId.value !== hostId) {
      throw new Error("This booking cannot be cancelled by this host");
    }

    booking.canceled = true;
    this.dispatch(new BookingCanceledByHostEvent(hostId));
  }
}
