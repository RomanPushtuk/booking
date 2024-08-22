import moment from "moment";
import { CreateHostDTO } from "../../src/dtos/CreateHostDTO";
import { CreateBookingDTO } from "../../src/dtos/CreateBookingDTO";
import { Host } from "../../src/domain/Host";
import { Booking } from "../../src/domain/Booking";

jest.mock("moment", () => {
  return () =>
    jest.requireActual("moment")("20.08.2024 22:10", "DD.MM.YYYY HH:mm");
});

describe("Host", () => {
  test("checkIfBookingInThePast", async () => {
    const createHostDto = new CreateHostDTO({
      id: "123",
      forwardBooking: "1week",
      workHours: [{ from: "9:00", to: "18:00" }],
      workDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    });
    const host = Host.fromDTO(createHostDto);

    const createBookingDto = new CreateBookingDTO({
      clientId: "321",
      hostId: "123",
      date: "20/08/2023",
      time: { from: "9:00", to: "10:00" },
    });

    const booking = Booking.fromDTO(createBookingDto);

    expect(() => {
      host.addBooking(booking);
    }).toThrow();
  });

  test("checkIfHostHasBooking", async () => {});

  test("checkIfLessThan10MinutesBeforeBookingStarts", async () => {});

  test("checkIfExistOverlapingBooking", async () => {});
});
