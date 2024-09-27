import { BookingRepository } from "../../src/repositories/BookingRepository";
import { db } from "../../db";
import { BookingFilters } from "../../src/application/BookingFilters";
import { BookingSorting } from "../../src/application/BookingSorting";
import { BookingDTO } from "../../src/dtos/BookingDTO";
import { Booking } from "../../src/domain/Booking";

describe("BookingRepository", () => {
  test("bookingRepository.getById", async () => {
    const bookingId = "3Pi6mKX5";
    const bookingRepository = new BookingRepository(db);
    const booking = await bookingRepository.getById(bookingId);
    expect(booking.id.value).toBe(bookingId);
  });

  test("bookingRepository.getAll + check bookingSorting + check bookingFilters", async () => {
    const bookingRepository = new BookingRepository(db);
    const bookingSorting = new BookingSorting("asc", "date");
    const bookingFilters = new BookingFilters({
      clientId: "aQKUaHTJ",
      timeFrom: "06:00",
      timeTo: "20:00",
      dateFrom: "2024-09-24",
      dateTo: "2024-09-25",
    });

    const bookings = await bookingRepository.getAll(
      bookingSorting,
      bookingFilters,
    );

    expect(bookings.length).toBe(2);
  });

  test("bookingRepository.save", async () => {
    const newBookingId = "9vjmww0c";

    const bookingDto = new BookingDTO({
      id: newBookingId,
      clientId: "aQKUaHTJ",
      hostId: "Y9oWsNNc",
      date: "2024-09-27",
      time: { from: "09:00", to: "10:00" },
    });
    const booking = Booking.fromDTO(bookingDto);

    const bookingRepository = new BookingRepository(db);
    const { id } = await bookingRepository.save(booking);

    expect(id).toBe(newBookingId);
  });
});
