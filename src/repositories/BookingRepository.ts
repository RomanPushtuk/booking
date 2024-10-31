import { Service } from "typedi";
import { Booking } from "../domain/Booking";
import { BookingDTO } from "../dtos/BookingDTO";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";
import { Ignite } from "../../ignite";
import { getBookingById } from "../sql/getBookingById";
import { getAllBookings } from "../sql/getAllBookings";
import { saveBooking } from "../sql/saveBooking";
import { Timestamp } from "../valueObjects/Timestamp";
import moment from "moment";

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
    const sql = getBookingById({ id });

    const data = (await Ignite.query(sql))[0];

    if (!data) throw new Error("no results");

    const bookingDto = new BookingDTO({
      ...data,
      time: { from: data.timeFrom, to: data.timeTo },
    });

    const booking = Booking.fromDTO(bookingDto);
    return booking;
  }

  public async getAll(
    sorting?: BookingSorting,
    filters?: BookingFilters
  ): Promise<Array<Booking>> {
    const sql = getAllBookings({ sorting, filters });
    console.log("sql", sql);
    const data: any[] = await Ignite.query(sql);

    const bookingDTOs = data.map((booking) => {
      const { ID, CLIENTID, HOSTID, DATETIMEFROM, DATETIMETO } = booking;
      const [date, timeFrom] = moment(DATETIMEFROM)
        .format("YYYY-MM-DD HH:mm")
        .split(" ");
      const [, timeTo] = moment(DATETIMETO)
        .format("YYYY-MM-DD HH:mm")
        .split(" ");

      return new BookingDTO({
        id: ID,
        clientId: CLIENTID,
        hostId: HOSTID,
        date: date,
        time: { from: timeFrom, to: timeTo },
      });
    });
    return bookingDTOs.map((booking) => Booking.fromDTO(booking));
  }

  public async save(booking: Booking): Promise<{ id: string }> {
    const {
      id,
      clientId,
      hostId,
      date,
      time: { from: timeFrom, to: timeTo },
      canceled,
      deleted,
    } = booking.getProperties();

    const dateTimeFrom = new Timestamp(date + " " + timeFrom).value;
    const dateTimeTo = new Timestamp(date + " " + timeTo).value;

    const bookingDbModel = {
      id,
      clientId,
      hostId,
      dateTimeFrom,
      dateTimeTo,
      isСanceled: canceled,
      isDeleted: deleted,
    };

    const sql = saveBooking(bookingDbModel);

    await Ignite.query(sql);

    return { id: booking.id.value };
  }

  public async saveAll(bookings: Array<Booking>): Promise<{ id: string }[]> {
    const promises = bookings.map(this.save.bind(this));
    return Promise.all(promises);
  }
}
