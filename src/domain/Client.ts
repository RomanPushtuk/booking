import { ClientDTO } from "../dtos/ClientDTO";
import { Id } from "../valueObjects/Id";

interface IClientProperties {
  id: string;
  isDeleted: boolean;
}

export class Client {
  readonly id: Id;
  private _isDeleted: boolean = false;

  private constructor(id: Id) {
    this.id = id;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  public seIsDeleted(flag: boolean) {
    this._isDeleted = flag;
  }

  static fromDTO(data: ClientDTO): Client {
    const id = new Id(data.id);
    return new Client(id);
  }

  public getProperties(): IClientProperties {
    return {
      id: this.id.value,
      isDeleted: this._isDeleted,
    };
  }
}
