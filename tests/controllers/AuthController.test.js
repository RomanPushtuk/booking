"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../../src/controllers/AuthController");
const CreateUserDTO_1 = require("../../src/dtos/CreateUserDTO");
describe("AuthController", () => {
    test("The call of the register method must be passed to the authService", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockAuthService = { register: jest.fn() };
        const createUserDto = new CreateUserDTO_1.CreateUserDTO({
            email: "romanpushtuk@gmail.com",
            password: "1234QWERRTY",
            role: "client",
        });
        const authController = new AuthController_1.AuthController(mockAuthService);
        yield authController.register(createUserDto);
        expect(mockAuthService).toHaveBeenCalledWith(createUserDto);
    }));
});
//# sourceMappingURL=AuthController.test.js.map