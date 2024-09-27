import { Service } from "typedi";
import * as knex from "knex";
import { Booking } from "../domain/Booking";
import { BookingDTO } from "../dtos/BookingDTO";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";

@Service()
export class BookingRepository {
  constructor(private _db: knex.Knex) {}

  public async getById(id: string): Promise<Booking> {
    const data = await this._db("bookings").where("id", id).first();
    console.log(data);
    const bookingDto = new BookingDTO({
      ...data,
      time: { from: data.timeFrom, to: data.timeTo },
    });
    const booking = Booking.fromDTO(bookingDto);
    return booking;
  }

  public async getAll(
    sorting?: BookingSorting,
    filters?: BookingFilters,
  ): Promise<Array<Booking>> {
    const queryBuilder = this._db("bookings");

    if (sorting) {
      queryBuilder.orderBy(sorting.property, sorting.direction.value);
    }

    if (filters) {
      if (filters.clientId) {
        queryBuilder.where("clientId", filters.clientId.value);
      }

      if (filters.hostId) {
        queryBuilder.where("hostId", filters.hostId.value);
      }

      if (filters.dateFrom) {
        queryBuilder.whereRaw(
          `date(date) >= '${filters.dateFrom.format("YYYY-MM-DD")}'`,
        );
      }

      if (filters.dateTo) {
        queryBuilder.whereRaw(
          `date(date) <= '${filters.dateTo.format("YYYY-MM-DD")}'`,
        );
      }

      if (filters.timeFrom) {
        queryBuilder.whereRaw(`time(timeFrom) >= '${filters.timeFrom.value}'`);
      }

      if (filters.timeTo) {
        queryBuilder.whereRaw(`time(timeTo) <= '${filters.timeTo.value}'`);
      }
    }

    const bookings = await queryBuilder;

    const bookingDTOs = bookings.map(
      (booking) =>
        new BookingDTO({
          ...booking,
          time: { from: booking.timeFrom, to: booking.timeTo },
        }),
    );
    return bookingDTOs.map((booking) => Booking.fromDTO(booking));
  }

  public async save(booking: Booking): Promise<{ id: string }> {
    const { id, clientId, hostId, date, time, canceled, deleted } =
      booking.getProperties();
    const bookingDbModel = {
      id,
      clientId,
      hostId,
      date,
      timeFrom: time.from,
      timeTo: time.to,
      isСanceled: canceled,
      isDeleted: deleted,
    };

    await this._db("bookings").insert(bookingDbModel).onConflict("id").merge();

    return { id: booking.id.value };
  }

  public async saveAll(bookings: Array<Booking>): Promise<{ id: string }[]> {
    const promises = bookings.map(this.save.bind(this));
    return Promise.all(promises);
  }
}
