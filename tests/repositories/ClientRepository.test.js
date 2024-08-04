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
const ClientRepository_1 = require("../../src/repositories/ClientRepository");
const db_1 = require("../../db");
describe("ClientRepository", () => {
    test("Should okay work with SQLite DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const clientRepository = new ClientRepository_1.ClientRepository(db_1.db);
        yield clientRepository.getById("aQKUaHTJ");
    }));
});
//# sourceMappingURL=ClientRepository.test.js.map