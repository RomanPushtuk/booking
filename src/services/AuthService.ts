import { Inject, Service } from "typedi";
import { Roles } from "../enums/Roles";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../domain/User";
import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { CreateHostDTO } from "../dtos/CreateHostDTO";
import { UnitOfWorkService } from "./UnitOfWorkService";
import { Client } from "../domain/Client";
import { Host } from "../domain/Host";

@Service()
export class AuthService {
  constructor(@Inject() private _unitOfWork: UnitOfWorkService) {}

  async register(data: CreateUserDTO): Promise<{ id: string }> {
    return this._unitOfWork.makeTransactional<Promise<{ id: string }>>(
      async () => {
        const user = User.fromDTO(data);
        await this._unitOfWork.userRepository.save(user);

        if (user.role.value === Roles.CLIENT) {
          const createClientDto = new CreateClientDTO({ id: user.id.value });
          const client = Client.fromDTO(createClientDto);
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

          const host = Host.fromDTO(createHostDto);
          return await this._unitOfWork.hostRepository.save(host);
        }

        throw new Error("Unknown role");
      },
    );
  }
}
