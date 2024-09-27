import { ClientDTO } from "../dtos/ClientDTO";
import { Id } from "../valueObjects/Id";

interface IClientProperties {
  id: string;
  deleted: boolean;
}

export class Client {
  readonly id: Id;
  private deleted: boolean = false;

  private constructor(id: Id) {
    this.id = id;
  }

  get isDeleted() {
    return this.deleted;
  }

  public seIsDeleted(flag: boolean) {
    this.deleted = flag;
  }

  static fromDTO(data: ClientDTO): Client {
    const id = new Id(data.id);
    return new Client(id);
  }

  public getProperties(): IClientProperties {
    return {
      id: this.id.value,
      deleted: this.deleted,
    };
  }
}
