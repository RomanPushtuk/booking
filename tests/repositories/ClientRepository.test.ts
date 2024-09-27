import { ClientRepository } from "../../src/repositories/ClientRepository";
import { db } from "../../db";
import { ClientDTO } from "../../src/dtos/ClientDTO";
import { Client } from "../../src/domain/Client";

describe("ClientRepository", () => {
  test("clientRepository.getById", async () => {
    const clientId = "aQKUaHTJ";
    const clientRepository = new ClientRepository(db);
    const client = await clientRepository.getById(clientId);
    expect(client.id.value).toBe(clientId);
  });

  test("clientRepository.save", async () => {
    const clientId = "aQKUaHTr";
    const clientRepository = new ClientRepository(db);
    const clientDto = new ClientDTO({ id: clientId });
    const client = Client.fromDTO(clientDto);
    const { id } = await clientRepository.save(client);
    expect(id).toBe(clientId);
  });
});
