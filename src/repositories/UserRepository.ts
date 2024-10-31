import { Service } from "typedi";
import { User } from "../domain/User";
import { UserDTO } from "../dtos/UserDTO";
import { getUserByEmailAndPassword } from "../sql/getUserByEmailAndPassword";
import { saveUser } from "../sql/saveUser";
import { Ignite } from "../../ignite";

@Service()
export class UserRepository {
  constructor() {}

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const sql = getUserByEmailAndPassword({
      email,
      password,
    });
    const data: any = (await Ignite.query(sql))[0];

    if (!data) return null;
    const { ID, EMAIL, PASSWORD, ROLE } = data;
    const userDto = new UserDTO({
      id: ID,
      email: EMAIL,
      password: PASSWORD,
      role: ROLE,
    });
    const user = User.fromDTO(userDto);
    return user;
  }

  async save(user: User): Promise<{ id: string }> {
    const userProperties = user.getProperties();
    const sql = saveUser(userProperties);
    await Ignite.query(sql);
    return { id: userProperties.id };
  }
}
