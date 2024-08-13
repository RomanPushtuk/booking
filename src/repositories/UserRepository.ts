import { Inject, Service } from "typedi";
import { User } from "../domain/User";
import { UserDTO } from "../dtos/UserDTO";
import { Id } from "../valueObjects/Id";
import * as knex from "knex";

@Service()
export class UserRepository {
  constructor(@Inject("db") private _db: knex.Knex) {}

  findOneByToken(token: string): UserDTO | null {
    throw new Error("Method not implemented");
  }

  async save(user: User): Promise<{ id: string }> {
    const userProperties = user.getProperties();
    await this._db("users").insert(userProperties);
    return { id: userProperties.id };
  }
}
