import "reflect-metadata";
import { nanoid } from "nanoid";
import { HoursMinutes } from "../../src/valueObjects/HoursMinutes";
import { WorkPeriod } from "../../src/application/WorkPeriod";
import { WorkPeriodFromMoreThenToError } from "../../src/errors/WorkPeriodFromMoreThenToError";

jest.mock("nanoid", () => "8vjwl4w5");

describe("WorkPeriod", () => {
  test("Check constructor work", async () => {
    const from = new HoursMinutes("09:00");
    const to = new HoursMinutes("10:00");

    expect(() => {
      new WorkPeriod(to, from);
    }).toThrow(WorkPeriodFromMoreThenToError);
  });
});
