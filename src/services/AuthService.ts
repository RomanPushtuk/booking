import { Inject, Service } from "typedi";
import { Roles } from "../enums/Roles";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../domain/User";
import { CreateHostDTO } from "../dtos/CreateHostDTO";
import { UnitOfWorkService } from "./UnitOfWorkService";
import { Client } from "../domain/Client";
import { Host } from "../domain/Host";
import { HostDTO } from "../dtos/HostDTO";
import { ClientDTO } from "../dtos/ClientDTO";

@Service()
export class AuthService {
  constructor(@Inject() private _unitOfWork: UnitOfWorkService) {}

  async register(data: CreateUserDTO): Promise<{ id: string }> {
    return this._unitOfWork.makeTransactional<Promise<{ id: string }>>(
      async () => {
        const user = User.fromDTO(data);
        await this._unitOfWork.userRepository.save(user);

        if (user.role.value === Roles.CLIENT) {
          const clientDto = new ClientDTO({ id: user.id.value });
          const client = Client.fromDTO(clientDto);
          return await this._unitOfWork.clientRepository.save(client);
        }

        if (user.role.value === Roles.HOST) {
          const createHostDto = new CreateHostDTO({
            id: user.id.value,
            workHours: [
              { from: "9:00", to: "13:00" },
              { from: "14:00", to: "18:00" },
            ],
            workDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
            forwardBooking: "1 week",
          });

          const hostDto = new HostDTO({ id: user.id.value, ...createHostDto });
          const host = Host.fromDTO(hostDto);
          return await this._unitOfWork.hostRepository.save(host);
        }

        throw new Error("Unknown role");
      },
    );
  }
}
