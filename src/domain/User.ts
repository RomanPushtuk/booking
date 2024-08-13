import { nanoid } from "nanoid";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { Email } from "../valueObjects/Email";
import { Password } from "../valueObjects/Password";
import { Id } from "../valueObjects/Id";
import { Role } from "../valueObjects/Role";

interface IUserProperties {
  id: string;
  email: string;
  password: string;
  role: string;
}

export class User {
  readonly id: Id;
  readonly email: Email;
  readonly password: Password;
  readonly role: Role;

  private constructor(id: Id, email: Email, password: Password, role: Role) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public static fromDTO(data: CreateUserDTO): User {
    const id = new Id(nanoid(8));
    const email = new Email(data.email);
    const password = new Password(data.password);
    const role = new Role(data.role);
    return new User(id, email, password, role);
  }

  public getProperties(): IUserProperties {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value,
    };
  }
}
