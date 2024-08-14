import { Inject, Service } from "typedi";
import * as knex from "knex";
import { Booking } from "../domain/Booking";
import { BookingSorting } from "../types/BookingSorting";
import { BookingFilters } from "../types/BookingFilters";
import { BookingDTO } from "../dtos/BookingDTO";
import { Id } from "../valueObjects/Id";

@Service()
export class BookingRepository {
  constructor(private _db: knex.Knex) {}

  public async getById(id: string): Promise<Booking> {
    throw new Error("Not implemented");
  }

  public async getAll(
    sorting?: BookingSorting,
    filters?: BookingFilters,
  ): Promise<Array<Booking>> {
    const bookings: Array<any> = await this._db("booking").where({
      sorting,
      filters,
    });
    const bookingDTOs = bookings.map((booking) => new BookingDTO(booking));
    return bookingDTOs.map((booking) => Booking.fromDTO(booking));
  }

  public async saveAll(bookings: Array<Booking>): Promise<string[]> {
    const bookingProperties = bookings.map((booking) =>
      booking.getProperties(),
    );
    if (bookingProperties.length === 0) return [];

    await this._db("bookings")
      .insert(bookingProperties)
      .onConflict("id")
      .merge();
    return bookingProperties.map(({ id }) => id);
  }
}
