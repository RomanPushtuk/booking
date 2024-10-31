import { Service } from "typedi";
import { Client } from "../domain/Client";
import { ClientDTO } from "../dtos/ClientDTO";
import { Ignite } from "../../ignite";
import { getClientById } from "../sql/getClientById";
import { saveClient } from "../sql/saveClient";

@Service()
export class ClientRepository {
  constructor() {}

  async getById(id: string): Promise<Client> {
    const sql = getClientById({ id });
    const data: any = (await Ignite.query(sql))[0];
    if (!data) throw new Error("no results");
    const { ID } = data;
    const clientDto = new ClientDTO({ id: ID });
    return Client.fromDTO(clientDto);
  }

  async save(client: Client): Promise<{ id: string }> {
    const { id, deleted } = client.getProperties();
    const clientModel = { id, isDeleted: deleted };
    const sql = saveClient(clientModel);
    await Ignite.query(sql);
    return { id: client.id.value };
  }
}
