import { createHostDtoSchema } from "../../src/validationSchemas/createHostDtoSchema";
import { ForwardBookingPeriods } from "../../src/enums/ForwardBookingPeriods";

describe("CreateHostDTO", () => {
  test("Valid createHostDto should not throw an Error", async () => {
      const validData = {
        id: "123",
        forwardBooking: { //field type in schema is not equal to HostDTO
          count: 5,
          days: String(ForwardBookingPeriods.day),
        },
        workHours: [
          { from: "09:00", to: "18:00" },
          { from: "10:00", to: "19:00" },
        ],
        workDays: ["Monday", "Tuesday", "Wednesday"],
      };

    await expect(createHostDtoSchema.validate(validData)).resolves.not.toThrow();
  });

  test("Invalid createHostDto should throw an Error", async () => {
    await expect(createHostDtoSchema.validate({})).rejects.toThrow();
  });
});
