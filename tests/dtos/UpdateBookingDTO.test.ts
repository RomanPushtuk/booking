import { updateBookingDTOSchema } from "../../src/validationSchemas/updateBookingDTOSchema";

describe("updateBookingDTO", () => {
  test("Valid updateBookingDTO should not throw an Error", async () => {
    const validData = {
      id: "123",
      date: "08.08.2024",
      time: {
        from: "09:00",
        to: "18:00"
      }
    };

    await expect(updateBookingDTOSchema.validate(validData)).resolves.not.toThrow();
  });

  test("Invalid updateBookingDTO should throw an Error", async () => {
    await expect(updateBookingDTOSchema.validate({})).rejects.toThrow();
  });

});
