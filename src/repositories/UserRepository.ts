import { Service } from "typedi";
import { User } from "../domain/User";
import { UserDTO } from "../dtos/UserDTO";
import { getUserByEmailAndPassword } from "../sql/getUserByEmailAndPassword";
import { saveUser } from "../sql/saveUser";
import { ODBC } from "../../ignite";

@Service()
export class UserRepository {
  constructor() {}

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const { sql, parameters } = getUserByEmailAndPassword({
      email,
      password,
    });
    const connection = ODBC.getConnection();
    const data = await connection.query(sql, parameters);
    ODBC.returnConnection(connection);

    if (!data) return null;
    const userDto = new UserDTO(data);

    const user = User.fromDTO(userDto);
    return user;
  }

  async save(user: User): Promise<{ id: string }> {
    const userProperties = user.getProperties();
    const { sql, parameters } = saveUser(userProperties);
    const connection = ODBC.getConnection();
    await connection.query(sql, parameters);
    ODBC.returnConnection(connection);
    return { id: userProperties.id };
  }
}
