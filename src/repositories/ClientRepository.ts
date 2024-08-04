import { Inject, Service } from "typedi";
import { Knex } from "knex";
import { Client } from "../domain/Client";
import { Id } from "../valueObjects/Id";
import { ClientDTO } from "../dtos/ClientDTO";

@Service()
export class ClientRepository {
  constructor(@Inject("db") private _db: Knex) {}

  async deleteById(id: string): Promise<Id> {
    await this._db("users").where("id", id).delete();
    return new Id(id);
  }
  async getById(id: string): Promise<Client> {
    const data = await this._db("users").where("id", id).first();
    const clientDto = new ClientDTO(data);
    return Client.fromDTO(clientDto);
  }
  async save(client: Client): Promise<Id> {
    const clientDTO = client.getProperties();
    await this._db("users").insert(clientDTO).onConflict("id").merge();
    return client.id;
  }
}
