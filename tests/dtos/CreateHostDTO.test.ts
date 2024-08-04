import { CreateHostDTO } from "../../src/dtos/CreateHostDTO";

describe("CreateHostDTO", () => {
  test("Validate CreateHostDTO hould not throw an Error", () => {
    new CreateHostDTO({});
  });
});
