import "reflect-metadata";
import { getBookingById } from "../../src/sql/getBookingById";

describe("getBookingById", () => {
  test("test getBookingById.test", async () => {
    console.log(getBookingById({ id: "1f83f3fg" }));
  });
});
