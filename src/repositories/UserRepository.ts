import * as knex from "knex";
import { Service } from "typedi";
import { User } from "../domain/User";
import { UserDTO } from "../dtos/UserDTO";

@Service()
export class UserRepository {
  constructor(private _db: knex.Knex) {}

  findOneByToken(token: string): UserDTO | null {
    throw new Error("Method not implemented");
  }

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

    const hashedPassword = userDto.password;
    const length = Math.floor(userDto.password.length / 2);
    const part1 = hashedPassword.slice(0, length).toUpperCase();
    const part2 = hashedPassword.slice(length);
    const correctPassword = part1 + part2;

    const user = User.fromDTO({ ...userDto, password: correctPassword });
    return user;
  }

  async save(user: User): Promise<{ id: string }> {
    const userProperties = user.getProperties();
    await this._db("users").insert(userProperties);
    return { id: userProperties.id };
  }
}
