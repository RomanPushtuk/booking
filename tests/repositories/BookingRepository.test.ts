import { BookingRepository } from "../../src/repositories/BookingRepository";
import { db } from "../../db";
import { BookingFilters } from "../../src/application/BookingFilters";
import { BookingSorting } from "../../src/application/BookingSorting";

describe("BookingRepository", () => {
  test("bookingRepository.getById", async () => {
    const bookingRepository = new BookingRepository(db);
    const booking = await bookingRepository.getById("3Pi6mKX5");
  });

  test("bookingRepository.getAll", async () => {
    const bookingRepository = new BookingRepository(db);
    const bookingSorting = undefined;
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
  });
});
