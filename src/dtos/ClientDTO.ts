export class ClientDTO {
  readonly id: string;

  constructor(data: any) {
    this.id = data.id;
  }
}
