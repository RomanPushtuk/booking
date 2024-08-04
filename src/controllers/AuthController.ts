import { Inject } from "typedi";
import { Body, Controller, Post } from "routing-controllers";
import { AuthService } from "../services/AuthService";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

@Controller("/auth")
export class AuthController {
  constructor(@Inject() private _authService: AuthService) {}

  @Post("/register")
  async register(@Body() data: CreateUserDTO) {
    return await this._authService.register(data);
  }
}
