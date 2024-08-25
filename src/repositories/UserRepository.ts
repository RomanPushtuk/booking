import * as knex from "knex";
import { Service } from "typedi";
import { User } from "../domain/User";
import { UserDTO } from "../dtos/UserDTO";

@Service()
export class UserRepository {
  constructor(private _db: knex.Knex) {}

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const data = await this._db("users")
      .select("*")
      .where({ email, password })
      .first();

    if (!data) return null;
    const userDto = new UserDTO(data);

    const user = User.fromDTO(userDto);
    return user;
  }

  async save(user: User): Promise<{ id: string }> {
    const userProperties = user.getProperties();
    await this._db("users").insert(userProperties);
    return { id: userProperties.id };
  }
}
