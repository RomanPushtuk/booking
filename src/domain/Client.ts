import { ClientDTO } from "../dtos/ClientDTO";
import { Id } from "../valueObjects/Id";

export class Client {
  readonly id: Id;

  private constructor(id: Id) {
    this.id = id;
  }

  static fromDTO(data: ClientDTO): Client {
    const id = new Id(data.id);
    return new Client(id);
  }

  public getProperties(): ClientDTO {
    return new ClientDTO(this);
  }
}
