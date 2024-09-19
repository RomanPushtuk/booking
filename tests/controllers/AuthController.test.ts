import "reflect-metadata";
import { nanoid } from "nanoid";

import { AuthController } from "../../src/controllers/AuthController";
import { AuthService } from "../../src/services/AuthService";
import { CreateUserDTO } from "../../src/dtos/CreateUserDTO";
import { LoginUserDTO } from "../../src/dtos/LoginUserDTO";

jest.mock("nanoid", () => "8vjwl4w5");

describe("AuthController", () => {
  test("The call of the register method must be passed to the authService", async () => {
    const mockAuthService = { register: jest.fn() } as unknown as AuthService;
    const createUserDto = new CreateUserDTO({
      email: "romanpushtuk@gmail.com",
      password: "1234QWERRTY",
      role: "client",
    });
    const authController = new AuthController(mockAuthService);
    await authController.register(createUserDto);
    expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto);
  });

  test("The call of the login method must be passed to the authService", async () => {
    const mockAuthService = { login: jest.fn() } as unknown as AuthService;
    const loginUserDto = new LoginUserDTO({
      email: "romanpushtuk@gmail.com",
      password: "1234QWERRTY",
    });
    const authController = new AuthController(mockAuthService);
    await authController.login(loginUserDto);
    expect(mockAuthService.login).toHaveBeenCalledWith(loginUserDto);
  });
});
