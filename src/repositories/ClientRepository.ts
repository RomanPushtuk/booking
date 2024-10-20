import { Service } from "typedi";
import { Client } from "../domain/Client";
import { ClientDTO } from "../dtos/ClientDTO";
import { ODBC } from "../../ignite";
import { getClientById } from "../sql/getClientById";
import { saveClient } from "../sql/saveClient";

@Service()
export class ClientRepository {
  constructor() {}

  async getById(id: string): Promise<Client> {
    const connection = ODBC.getConnection();
    const { sql, parameters } = getClientById({ id });
    const data = (await connection.query(sql, parameters))[0];
    ODBC.returnConnection(connection);
    if (!data) throw new Error("no results");
    const clientDto = new ClientDTO(data);
    return Client.fromDTO(clientDto);
  }

  async save(client: Client): Promise<{ id: string }> {
    const connection = ODBC.getConnection();
    const { id, deleted } = client.getProperties();
    const clientModel = { id, isDeleted: deleted };
    const { sql, parameters } = saveClient(clientModel);
    await connection.query(sql, parameters);
    return { id: client.id.value };
  }
}
