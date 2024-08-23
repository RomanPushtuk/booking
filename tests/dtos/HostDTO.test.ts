import { ForwardBookingPeriods } from "../../src/enums/ForwardBookingPeriods";
import { HostDTO } from "../../src/dtos/HostDTO";

describe("hostDto", () => {
  test("Valid hostDto should not throw an Error", () => {
    const validData = {
      id: "123",
      forwardBooking: {
        count: 5,
        days: String(ForwardBookingPeriods.day),
      },
      workHours: [
        { from: "09:00", to: "18:00" },
        { from: "10:00", to: "19:00" },
      ],
      workDays: ["Monday", "Tuesday", "Wednesday"],
    };

    expect(() => new HostDTO(validData)).not.toThrow();
  });

  test("Invalid hostDto should throw an Error", () => {
    expect(() => new HostDTO({})).toThrow();
  });
});
