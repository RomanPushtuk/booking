export class UserDTO {
  id: string;
  role: string;
  constructor(data: any) {
    this.id = data.id;
    this.role = data.role;
  }
}
