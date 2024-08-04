import { User } from "../domain/User";
import { UserDTO } from "../dtos/UserDTO";
import { Id } from "../valueObjects/Id";

export class UserRepository {
  findOneByToken(token: string): UserDTO | null {
    throw new Error("Method not implemented");
  }

  save(user: User): Promise<Id> {
    throw new Error("Method not implemented");
  }
}
