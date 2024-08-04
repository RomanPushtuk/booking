import { ClientRepository } from "../../src/repositories/ClientRepository";
import { db } from "../../db";

describe("ClientRepository", () => {
  test("Should okay work with SQLite DB", async () => {
    const clientRepository = new ClientRepository(db);
    await clientRepository.getById("aQKUaHTJ");
  });
});
