import "reflect-metadata";
import { nanoid } from "nanoid";

import { ClientService } from "../../src/services/ClientService";
import { HostService } from "../../src/services/HostService";
import { UnitOfWorkService } from "../../src/services/UnitOfWorkService";
import { ClientDTO } from "../../src/dtos/ClientDTO";
import { Client } from "../../src/domain/Client";
import { CreateClientDTO } from "../../src/dtos/CreateClientDTO";

jest.mock("nanoid", () => "8vjwl4w5");

describe("ClientService", () => {
  test("test clientService.getClient", async () => {
    const clientId = "8fj28dj4";
    const clientDto = new ClientDTO({ id: clientId });
    const client = Client.fromDTO(clientDto);

    const mockUnitOfWorkService = {
      clientRepository: {
        getById: jest.fn().mockImplementation(() => client),
      },
    } as unknown as UnitOfWorkService;
    const mockHostService = {} as unknown as HostService;

    const clientService = new ClientService(
      mockHostService,
      mockUnitOfWorkService
    );

    const result = await clientService.getClient(clientId);
    const stringifyResult = JSON.stringify(result);
    const stringifyClientDto = JSON.stringify(clientDto);

    expect(stringifyResult).toBe(stringifyClientDto);
    expect(mockUnitOfWorkService.clientRepository.getById).toHaveBeenCalledWith(
      clientId
    );
  });

  test("test clientService.deleteClient", async () => {
    const clientId = "8fj28dj4";
    const clientDto = new ClientDTO({ id: clientId });
    const client = Client.fromDTO(clientDto);
    client.seIsDeleted(true);

    const mockUnitOfWorkService = {
      clientRepository: {
        getById: jest.fn().mockImplementation(() => client),
        save: jest.fn().mockImplementation(() => ({ id: clientId })),
      },
    } as unknown as UnitOfWorkService;
    const mockHostService = {} as unknown as HostService;

    const clientService = new ClientService(
      mockHostService,
      mockUnitOfWorkService
    );

    const result = await clientService.deleteClient(clientId);
    const stringifyResult = JSON.stringify(result);
    const stringifyExpected = JSON.stringify({ id: clientId });

    expect(stringifyResult).toBe(stringifyExpected);
    expect(mockUnitOfWorkService.clientRepository.getById).toHaveBeenCalledWith(
      clientId
    );
    expect(mockUnitOfWorkService.clientRepository.save).toHaveBeenCalledWith(
      client
    );
  });

  test("test clientService.createClient", async () => {
    const clientId = "8fj28dj4";
    const clientDto = new CreateClientDTO({ id: clientId });
    const client = Client.fromDTO(clientDto);

    const mockUnitOfWorkService = {
      clientRepository: {
        save: jest.fn().mockImplementation(() => ({ id: clientId })),
      },
    } as unknown as UnitOfWorkService;
    const mockHostService = {} as unknown as HostService;

    const clientService = new ClientService(
      mockHostService,
      mockUnitOfWorkService
    );

    const result = await clientService.createClient(clientDto);
    const stringifyResult = JSON.stringify(result);
    const stringifyExpected = JSON.stringify({ id: clientId });

    expect(stringifyResult).toBe(stringifyExpected);
    expect(mockUnitOfWorkService.clientRepository.save).toHaveBeenCalledWith(
      client
    );
  });

  test("test clientService.getBookings", async () => {});
});
