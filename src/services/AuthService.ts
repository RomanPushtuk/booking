import { Inject, Service } from "typedi";
import jwt from "jsonwebtoken";
import { Roles } from "../enums/Roles";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../domain/User";
import { UnitOfWorkService } from "./UnitOfWorkService";
import { Client } from "../domain/Client";
import { Host } from "../domain/Host";
import { HostDTO } from "../dtos/HostDTO";
import { ClientDTO } from "../dtos/ClientDTO";
import { UserDTO } from "../dtos/UserDTO";
import { nanoid } from "nanoid";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { Password } from "../valueObjects/Password";

@Service()
export class AuthService {
  constructor(@Inject() private _unitOfWork: UnitOfWorkService) {}

  async register(data: CreateUserDTO): Promise<{ token: string }> {
    return this._unitOfWork.makeTransactional<Promise<{ token: string }>>(
      async () => {
        const userDto = new UserDTO({
          id: nanoid(8),
          ...data,
        });
        const loginUserDTO = new LoginUserDTO(userDto);
        const user = User.fromDTO(userDto);
        await this._unitOfWork.userRepository.save(user);

        if (user.role.value === Roles.CLIENT) {
          const clientDto = new ClientDTO({ id: user.id.value });
          const client = Client.fromDTO(clientDto);
          await this._unitOfWork.clientRepository.save(client);
          return this.login(loginUserDTO);
        }

        if (user.role.value === Roles.HOST) {
          const hostDto = new HostDTO({
            id: user.id.value,
            workHours: [
              { from: "9:00", to: "13:00" },
              { from: "14:00", to: "18:00" },
            ],
            workDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
            forwardBooking: "1 week",
          });
          const host = Host.fromDTO(hostDto);
          await this._unitOfWork.hostRepository.save(host);
          return this.login(loginUserDTO);
        }

        throw new Error("Unknown role");
      },
    );
  }

  async login(data: LoginUserDTO): Promise<{ token: string }> {
    const { email, password } = data;

    const user = await this._unitOfWork.userRepository.findByEmailAndPassword(
      email,
      Password.encrypt(password),
    );

    if (!user) throw new Error("user was not registred");
    const userProperties = user.getProperties();
    const token = jwt.sign(userProperties, "secret", { expiresIn: "7h" });
    return { token };
  }
}
