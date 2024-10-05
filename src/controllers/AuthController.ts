import { Inject, Service } from "typedi";
import { Body, JsonController, Post } from "routing-controllers";
import { AuthService } from "../services/AuthService";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { Logger } from "../application/Logger";

@JsonController("/auth")
@Service()
export class AuthController {
  constructor(@Inject() private _authService: AuthService) {}

  @Post("/register")
  async register(@Body() data: any): Promise<{ token: string }> {
    const createUserDto = new CreateUserDTO(data);
    return await this._authService.register(createUserDto);
  }

  @Post("/login")
  async login(@Body() data: any): Promise<{ token: string }> {
    const loginUserDto = new LoginUserDTO(data);
    Logger.get().info("logger works1");
    return await this._authService.login(loginUserDto);
  }
}
