import { Service } from "typedi";
import * as knex from "knex";
import { Client } from "../domain/Client";
import { Id } from "../valueObjects/Id";
import { ClientDTO } from "../dtos/ClientDTO";

@Service()
export class ClientRepository {
  constructor(private _db: knex.Knex) {}

  async deleteById(id: string): Promise<Id> {
    await this._db("users").where("id", id).delete();
    return new Id(id);
  }
  async getById(id: string): Promise<Client> {
    const data = await this._db("clients").where("id", id).first();
    const clientDto = new ClientDTO(data);
    return Client.fromDTO(clientDto);
  }
  async save(client: Client): Promise<{ id: string }> {
    const clientProperties = client.getProperties();
    await this._db("clients").insert(clientProperties).onConflict("id").merge();
    return { id: clientProperties.id };
  }
}
