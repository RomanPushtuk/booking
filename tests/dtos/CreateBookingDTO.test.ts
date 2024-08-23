import { createBookingDTOSchema } from "../../src/validationSchemas/createBookingDTOSchema";

describe("createBookingDTO", () => {
  test("Valid createBookingDTO should not throw an Error", async () => {
    const validData = {
      clientId: "123",
      hostId: "321",
      date: "08.08.2024",
      time: {
        from: "10:00",
        to: "11:00"
      }
    };

    await expect(createBookingDTOSchema.validate(validData)).resolves.not.toThrow();
  });

  test("Invalid createBookingDTO should throw an Error", async () => {
    await expect(createBookingDTOSchema.validate({})).rejects.toThrow();
  });

});
