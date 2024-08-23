import { CreateBookingDTO } from "../../src/dtos/CreateBookingDTO";

describe("createBookingDTO", () => {
  test("Valid createBookingDTO should not throw an Error", () => {
    const validData = {
      clientId: "123",
      hostId: "321",
      date: "08.08.2024",
      time: {
        from: "10:00",
        to: "11:00",
      },
    };

    expect(() => new CreateBookingDTO(validData)).not.toThrow();
  });

  test("Invalid createBookingDTO should throw an Error", () => {
    expect(() => new CreateBookingDTO({})).toThrow();
  });
});
