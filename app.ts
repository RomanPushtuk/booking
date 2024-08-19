import "reflect-metadata";
import { createExpressServer, useContainer, Action } from "routing-controllers";
import { Container } from "typedi";
import * as knex from "knex";
import { db } from "./db";

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(Container);
Container.set<knex.Knex>("db", db);

import { ClientController } from "./src/controllers/ClientController";
import { HostController } from "./src/controllers/HostController";
import { AuthController } from "./src/controllers/AuthController";
import { UnitOfWorkService } from "./src/services/UnitOfWorkService";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  authorizationChecker: async (action: Action, roles: string[]) => {
    // here you can use request/response objects from action
    // also if decorator defines roles it needs to access the action
    // you can use them to provide granular access check
    // checker must return either boolean (true or false)
    // either promise that resolves a boolean value
    const token = action.request.headers["Authorization"];
    const uow = Container.get(UnitOfWorkService);
    // TODO - add identity manager support in order not to request
    // the user from the database every time, but to store it in the local Map
    const user = uow.userRepository.findOneByToken(token);
    if (!user || !roles.length) return false;
    if (roles.includes(user.role)) return true;

    return false;
  },
  currentUserChecker: async (action: Action) => {
    // here you can use request/response objects from action
    // you need to provide a user object that will be injected in controller actions
    const token = action.request.headers["Authorization"];
    const uow = Container.get(UnitOfWorkService);
    // TODO - add identity manager support in order not to request
    // the user from the database every time, but to store it in the local Map
    return uow.userRepository.findOneByToken(token);
  },
  classTransformer: false,
  controllers: [ClientController, HostController, AuthController],
});

// run express application on port 3000
app.listen(3000, () => {
  console.log("backend started on 3000 port");
});
