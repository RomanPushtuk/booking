import { Inject, Service } from "typedi";
import { Roles } from "../enums/Roles";
import { UserRepository } from "../repositories/UserRepository";
import { ClientService } from "./ClientService";
import { HostService } from "./HostService";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../domain/User";
import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { CreateHostDTO } from "../dtos/CreateHostDTO";

@Service()
export class AuthService {
  constructor(
    @Inject() private userRepository: UserRepository,
    @Inject() private clientService: ClientService,
    @Inject() private hostService: HostService,
  ) {}

  async register(data: CreateUserDTO): Promise<{ id: string }> {
    const user = User.fromDTO(data);
    await this.userRepository.save(user);

    if (user.role.value === Roles.CLIENT) {
      const createClientDto = new CreateClientDTO({ id: user.id.value });
      return this.clientService.createClient(createClientDto);
    }

    if (user.role.value === Roles.HOST) {
      const createHostDto = new CreateHostDTO({
        id: user.id,
        workHours: [
          { from: "9:00", to: "13:00" },
          { from: "14:00", to: "18:00" },
        ],
        workDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        forwardBooking: "1 week",
      });

      return this.hostService.createHost(createHostDto);
    }

    throw new Error("Unknown role");
  }
}
