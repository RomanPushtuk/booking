import { ForwardBookingPeriods } from "../../src/enums/ForwardBookingPeriods";
import { CreateHostDTO } from "../../src/dtos/CreateHostDTO";

describe("CreateHostDTO", () => {
  test("Valid createHostDto should not throw an Error", () => {
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

    expect(() => new CreateHostDTO(validData)).not.toThrow();
  });

  test("Invalid createHostDto should throw an Error", () => {
    expect(() => new CreateHostDTO({})).toThrow();
  });
});
