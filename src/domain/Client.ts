import { ClientDTO } from "../dtos/ClientDTO";
import { Id } from "../valueObjects/Id";

interface IClientProperties {
  id: string;
}

export class Client {
  readonly id: Id;

  private constructor(id: Id) {
    this.id = id;
  }

  static fromDTO(data: ClientDTO): Client {
    const id = new Id(data.id);
    return new Client(id);
  }

  public getProperties(): IClientProperties {
    return {
      id: this.id.value,
    };
  }
}
