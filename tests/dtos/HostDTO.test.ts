import { hostDtoSchema } from "../../src/validationSchemas/hostDtoSchema";
import { ForwardBookingPeriods } from "../../src/enums/ForwardBookingPeriods";

describe("hostDto", () => {
  test("Valid hostDto should not throw an Error", async () => {
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

    await expect(hostDtoSchema.validate(validData)).resolves.not.toThrow();
  });

  test("Invalid hostDto should throw an Error", async () => {
    await expect(hostDtoSchema.validate({})).rejects.toThrow();
  });

});
