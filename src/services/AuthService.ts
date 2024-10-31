import { Inject, Service } from "typedi";
import jwt from "jsonwebtoken";
import { Roles } from "../enums/Roles";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../domain/User";
import { Client } from "../domain/Client";
import { Host } from "../domain/Host";
import { HostDTO } from "../dtos/HostDTO";
import { ClientDTO } from "../dtos/ClientDTO";
import { UserDTO } from "../dtos/UserDTO";
import { nanoid } from "nanoid";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { Password } from "../valueObjects/Password";
import { UserRepository } from "../repositories/UserRepository";
import { ClientRepository } from "../repositories/ClientRepository";
import { HostRepository } from "../repositories/HostRepository";

@Service()
export class AuthService {
  constructor(
    @Inject() private _userRepository: UserRepository,
    @Inject() private _clientRepository: ClientRepository,
    @Inject() private _hostRepository: HostRepository,
  ) {}

  async register(data: CreateUserDTO): Promise<{ token: string }> {
    const userDto = new UserDTO({
      id: nanoid(8),
      ...data,
    });
    const loginUserDTO = new LoginUserDTO(userDto);
    const user = User.fromDTO(userDto);
    await this._userRepository.save(user);

    if (user.role.value === Roles.CLIENT) {
      const clientDto = new ClientDTO({ id: user.id.value });
      const client = Client.fromDTO(clientDto);
      await this._clientRepository.save(client);
      return this.login(loginUserDTO);
    }

    if (user.role.value === Roles.HOST) {
      const hostDto = new HostDTO({
        id: user.id.value,
        workHours: [
          { from: "09:00", to: "13:00" },
          { from: "14:00", to: "18:00" },
        ],
        workDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        forwardBooking: "1 week",
      });
      const host = Host.fromDTO(hostDto);
      await this._hostRepository.save(host);
      return this.login(loginUserDTO);
    }

    throw new Error("Unknown role");
  }

  async login(data: LoginUserDTO): Promise<{ token: string }> {
    const { email, password } = data;

    const user = await this._userRepository.findByEmailAndPassword(
      email,
      Password.encrypt(password),
    );

    if (!user) throw new Error("user was not registred");
    const userProperties = user.getProperties();
    const token = jwt.sign(userProperties, "secret", { expiresIn: "7h" });
    return { token };
  }
}
