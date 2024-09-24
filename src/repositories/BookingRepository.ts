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

    console.log(bookings);

    const bookingDTOs = bookings.map(
      (booking) =>
        new BookingDTO({
          ...booking,
          time: { from: booking.timeFrom, to: booking.timeTo },
        }),
    );
    return bookingDTOs.map((booking) => Booking.fromDTO(booking));
  }

  public async saveAll(bookings: Array<Booking>): Promise<string[]> {
    const bookingProperties = bookings.map((booking) => {
      const props = booking.getProperties();
      return {
        ...props,
        time: JSON.stringify(props.time),
      };
    });
    if (bookingProperties.length === 0) return [];

    await this._db("bookings")
      .insert(bookingProperties)
      .onConflict("id")
      .merge();
    return bookingProperties.map(({ id }) => id);
  }
}
