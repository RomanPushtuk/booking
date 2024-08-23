import { ForwardBookingPeriods } from "../../src/enums/ForwardBookingPeriods";
import { UpdateHostDTO } from "../../src/dtos/UpdateHostDTO";

describe("updateHostDTO", () => {
  test("Valid updateHostDto should not throw an Error", () => {
    const validData = {
      id: "123",
      forwardBooking: {
        //TODO field type in schema is not equal to HostDTO
        count: 5,
        days: String(ForwardBookingPeriods.day),
      },
      workHours: [
        { from: "09:00", to: "18:00" },
        { from: "10:00", to: "19:00" },
      ],
      workDays: ["Monday", "Tuesday", "Wednesday"],
    };

    expect(() => new UpdateHostDTO(validData)).not.toThrow();
  });

  test("Invalid updateHostDto should throw an Error", () => {
    expect(() => new UpdateHostDTO({})).toThrow();
  });
});
