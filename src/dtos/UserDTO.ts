import { AuthRoles } from "../enums/Roles";

export class UserDTO {
  id: string;
  role: AuthRoles;
  constructor(data: any) {
    this.id = data.id;
    this.role = data.role;
  }
}
