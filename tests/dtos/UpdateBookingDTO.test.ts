import { UpdateBookingDTO } from "../../src/dtos/UpdateBookingDTO";

describe("updateBookingDTO", () => {
  test("Valid updateBookingDTO should not throw an Error", () => {
    const validData = {
      id: "123",
      date: "08.08.2024",
      time: {
        from: "09:00",
        to: "18:00",
      },
    };

    expect(() => new UpdateBookingDTO(validData)).not.toThrow();
  });

  test("Invalid updateBookingDTO should throw an Error", () => {
    expect(() => new UpdateBookingDTO({})).toThrow();
  });
});
