import { bookingDtoSchema } from "../../src/validationSchemas/bookingDtoSchema";

describe("bookingDto", () => {

  test("Valid bookingDto should not throw an Error", async () => {
    const validData = {
      id: "123",
      clientId: "456",
      hostId: "789",
      date: "2024-08-23",
      time: {
        from: "10:00",
        to: "11:00"
      }
    };

    await expect(bookingDtoSchema.validate(validData)).resolves.not.toThrow();
  });

  test("Invalid bookingDto should throw an Error ", async () => {

    await expect(bookingDtoSchema.validate({})).rejects.toThrow();
  });

});
