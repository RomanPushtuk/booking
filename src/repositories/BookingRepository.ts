import { Inject } from "typedi";
import { Booking } from "../domain/Booking";
import { BookingSorting } from "../types/BookingSorting";
import { BookingFilters } from "../types/BookingFilters";
import { BookingDTO } from "../dtos/BookingDTO";

export class BookingRepository {
  constructor(@Inject() private _db: Db) {}

  public async getById(id: string): Promise<Booking> {
    throw new Error('Not implemented')
  }

  public async getAll(
    sorting: BookingSorting,
    filters: BookingFilters,
  ): Promise<Array<Booking>> {
    const bookings: Array<any> = await this._db.getAll(sorting, filters);
    const bookingDTOs = bookings.map((booking) => new BookingDTO(booking));
    return bookingDTOs.map((booking) => Booking.fromDTO(booking));
  }

  public async saveAll(bookings: Array<Booking>): Array<Id> {}
}
