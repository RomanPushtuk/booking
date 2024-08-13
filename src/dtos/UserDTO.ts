import { Roles } from "../enums/Roles";

export class UserDTO {
  id: string;
  role: Roles;
  constructor(data: any) {
    this.id = data.id;
    this.role = data.role;
  }
}
