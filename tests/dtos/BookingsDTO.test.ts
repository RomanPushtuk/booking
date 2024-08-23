import { BookingDTO } from "../../src/dtos/BookingDTO";

describe("bookingDto", () => {
  test("Valid bookingDto should not throw an Error", () => {
    const validData = {
      id: "123",
      clientId: "456",
      hostId: "789",
      date: "2024-08-23",
      time: {
        from: "10:00",
        to: "11:00",
      },
    };

    expect(() => new BookingDTO(validData)).not.toThrow();
  });

  test("Invalid bookingDto should throw an Error ", () => {
    expect(() => new BookingDTO({})).toThrow();
  });
});
