"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserDTO_1 = require("../../src/dtos/CreateUserDTO");
describe("CreateUserDTO", () => {
    test("Validate CreateUserDTO hould not throw an Error", () => {
        new CreateUserDTO_1.CreateUserDTO({
            email: "romanpushtuk@gmail.com",
            password: "1234QWERRTY",
            role: "client",
        });
    });
    test("Should be throw Error because empty dto is invalid", () => {
        expect(() => {
            new CreateUserDTO_1.CreateUserDTO({});
        }).toThrow();
    });
    test("Should be throw Error because wrong role", () => {
        expect(() => {
            new CreateUserDTO_1.CreateUserDTO({
                email: "romanpushtuk@gmail.com",
                password: "1234QWERRTY",
                role: "WRONG_client",
            });
        }).toThrow();
    });
    test("Should be throw Error because password less then 8 characters", () => {
        expect(() => {
            new CreateUserDTO_1.CreateUserDTO({
                email: "romanpushtuk@gmail.com",
                password: "1234A",
                role: "client",
            });
        }).toThrow();
    });
    test("Should be throw Error because password more then 32 characters", () => {
        expect(() => {
            new CreateUserDTO_1.CreateUserDTO({
                email: "romanpushtuk@gmail.com",
                password: "1234A1280923928348239hf89hfh934hf3h94f93h4f983h4f934hf934h",
                role: "client",
            });
        }).toThrow();
    });
    test("Should be throw Error because invalid email", () => {
        expect(() => {
            new CreateUserDTO_1.CreateUserDTO({
                email: "romanpushtuk@@gmail.com",
                password: "1234QWERRTY",
                role: "client",
            });
        }).toThrow();
    });
});
//# sourceMappingURL=CreateUserDTO.test.js.map