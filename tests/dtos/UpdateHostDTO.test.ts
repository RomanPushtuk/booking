import { ForwardBookingPeriods } from "../../src/enums/ForwardBookingPeriods";
import { updateHostDtoSchema } from "../../src/validationSchemas/updateHostDtoSchema";

describe("updateHostDTO", () => {
  test("Valid updateHostDto should not throw an Error", async () => {
    const validData = {
      id: "123",
      forwardBooking: { //field type in schema is not equal to HostDTO
        count: 5,
        days: String(ForwardBookingPeriods.day)
      },
      workHours: [
        { from: "09:00", to: "18:00" },
        { from: "10:00", to: "19:00" }
      ],
      workDays: ["Monday", "Tuesday", "Wednesday"]
    };

    await expect(updateHostDtoSchema.validate(validData)).resolves.not.toThrow();
  });

  test("Invalid updateHostDto should throw an Error", async () => {
    await expect(updateHostDtoSchema.validate({})).rejects.toThrow();
  });
});
