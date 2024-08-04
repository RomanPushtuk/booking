import { AuthController } from "../../src/controllers/AuthController";
import { AuthService } from "../../src/services/AuthService";
import { CreateUserDTO } from "../../src/dtos/CreateUserDTO";

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
    expect(mockAuthService).toHaveBeenCalledWith(createUserDto);
  });
});
