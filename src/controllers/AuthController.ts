import { Inject, Service } from "typedi";
import { Body, JsonController, Post } from "routing-controllers";
import { AuthService } from "../services/AuthService";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

@JsonController("/auth")
@Service()
export class AuthController {
  constructor(@Inject() private _authService: AuthService) {}

  @Post("/register")
  async register(@Body() data: any): Promise<{ id: string }> {
    const createUserDto = new CreateUserDTO(data);
    return await this._authService.register(createUserDto);
  }
}
