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
    throw new Error("Not implemented");
  }

  public async getAll(
    sorting?: BookingSorting,
    filters?: BookingFilters,
  ): Promise<Array<Booking>> {
    const bookings: Array<any> = await this._db("bookings").select("*");
    console.log("bookings");
    console.log(bookings);
    const bookingDTOs = bookings.map(
      (booking) =>
        new BookingDTO({
          ...booking,
          time: JSON.parse(booking.time),
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
