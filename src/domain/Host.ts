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

interface IHostProperties {
  id: string;
  forwardBooking: string;
  workHours: Array<{ from: string; to: string }>;
  workDays: Array<string>;
  deleted: boolean;
}

export class Host extends AggregateRoot {
  readonly id: Id;
  upcomingBookings: Array<Booking>;
  readonly forwardBooking: ForwardBooking;
  workHours: Array<WorkPeriod>;
  workDays: Array<Weekday>;
  deleted: boolean = false;

  private constructor(
    id: Id,
    upcomingBookings: Array<Booking>,
    forwardBooking: ForwardBooking,
    workHours: Array<WorkPeriod>,
    workDays: Array<Weekday>,
  ) {
    super();
    this.id = id;
    this.upcomingBookings = upcomingBookings;
    this.forwardBooking = forwardBooking;
    this.workHours = workHours;
    this.workDays = workDays;
  }

  public setWorkHours(workHours: Array<WorkPeriod>) {
    this.workHours = workHours;
  }

  public setWorkDays(workDays: Array<Weekday>) {
    this.workDays = workDays;
  }

  public setIsDeleted(flag: boolean) {
    this.deleted = flag;
  }

  static fromDTO(data: HostDTO): Host {
    const id = new Id(data.id);
    const upcomingBookings: Array<Booking> = [];
    const forwardBooking = new ForwardBooking(data.forwardBooking);
    const workHours = data.workHours.map(
      ({ from, to }) =>
        new WorkPeriod(new HoursMinutes(from), new HoursMinutes(to)),
    );
    const workDays = data.workDays.map((item) => new Weekday(item));

    return new Host(id, upcomingBookings, forwardBooking, workHours, workDays);
  }

  public getProperties(): IHostProperties {
    return {
      id: this.id.value,
      forwardBooking: this.forwardBooking.value,
      workHours: this.workHours.map(({ from, to }) => ({
        from: from.value,
        to: to.value,
      })),
      workDays: this.workDays.map((item) => item.value),
      deleted: this.deleted,
    };
  }

  setUpcomingBookings(upcomingBookings: Booking[]) {
    this.upcomingBookings = upcomingBookings;
  }

  getUpcomingBookings(): Array<Booking> {
    return this.upcomingBookings;
  }

  private checkIfExistOverlapingBooking = (
    booking: Booking,
    bookings: Array<Booking>,
  ): boolean => {
    const { from: from1, to: to1 } = booking.getDateTimePeriod();
    for (const b of bookings) {
      const { from: from2, to: to2 } = b.getDateTimePeriod();
      if (from1.isSameOrAfter(from2) && to1.isSameOrBefore(to2)) return true;
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
    return false;
  };

  private checkIfHostHasBooking = (booking: Booking): boolean => {
    const findBooking = this.upcomingBookings.find(
      (upcomingBooking) => upcomingBooking === booking,
    );
    if (findBooking) return true;
    return false;
  };

  public addBooking(booking: Booking) {
    if (this.checkIfBookingInThePast(booking)) {
      throw new Error("It is not possible to create a booking for a past date");
    }

    if (this.checkIfExistOverlapingBooking(booking, this.upcomingBookings)) {
      throw new Error("Host has booking on this date and time");
    }

    this.upcomingBookings.push(booking);
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

    if (this.checkIfExistOverlapingBooking(booking, this.upcomingBookings)) {
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
