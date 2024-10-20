import { Service } from "typedi";
import { Booking } from "../domain/Booking";
import { BookingDTO } from "../dtos/BookingDTO";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";
import { ODBC } from "../../ignite";
import { getBookingById } from "../sql/getBookingById";
import { getAllBookings } from "../sql/getAllBookings";
import { saveBooking } from "../sql/saveBooking";

interface BookingModel {
  id: string;
  clientId: string;
  hostId: string;
  date: string;
  timeFrom: string;
  timeTo: string;
}

@Service()
export class BookingRepository {
  public async getById(id: string): Promise<Booking> {
    const connection = ODBC.getConnection();
    const { sql, parameters } = getBookingById({ id });

    const data = (await connection.query<BookingModel>(sql, parameters))[0];

    if (!data) throw new Error("no results");

    ODBC.returnConnection(connection);

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
    const connection = ODBC.getConnection();

    const { sql, parameters } = getAllBookings({ sorting, filters });

    const data = await connection.query<BookingModel>(sql, parameters);

    ODBC.returnConnection(connection);

    const bookingDTOs = data.map(
      (booking) =>
        new BookingDTO({
          ...booking,
          time: { from: booking.timeFrom, to: booking.timeTo },
        }),
    );
    return bookingDTOs.map((booking) => Booking.fromDTO(booking));
  }

  public async save(booking: Booking): Promise<{ id: string }> {
    const connection = ODBC.getConnection();

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

    const { sql, parameters } = saveBooking(bookingDbModel);

    await connection.query(sql, parameters);

    ODBC.returnConnection(connection);

    return { id: booking.id.value };
  }

  public async saveAll(bookings: Array<Booking>): Promise<{ id: string }[]> {
    const promises = bookings.map(this.save.bind(this));
    return Promise.all(promises);
  }
}
