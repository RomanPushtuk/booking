import "reflect-metadata";
import express from "express";
import { useExpressServer, useContainer, Action } from "routing-controllers";
import { Container } from "typedi";
import jwt, { JwtPayload } from "jsonwebtoken";

import { moment } from "./src/utils/moment";
import { FIVE_MINUTES } from "./src/constants/FIVE_MINUTES";

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(Container);

import { ClientController } from "./src/controllers/ClientController";
import { HostController } from "./src/controllers/HostController";
import { AuthController } from "./src/controllers/AuthController";
import { UnitOfWorkService } from "./src/services/UnitOfWorkService";
import { InitAsyncLocalStorageMiddleware } from "./src/middlewares/InitAsyncLocalStorageMiddleware";
import { Logger } from "./src/application/Logger";

const app = express(); // your created express server

// creates express app, registers all controller routes and returns you express app instance
useExpressServer(app, {
  authorizationChecker: async (action: Action, roles: string[]) => {
    // here you can use request/response objects from action
    // also if decorator defines roles it needs to access the action
    // you can use them to provide granular access check
    // checker must return either boolean (true or false)
    // either promise that resolves a boolean value
    const token = action.request.headers["authorization"];
    const uow = Container.get(UnitOfWorkService);
    // TODO - add identity manager support in order not to request
    // the user from the database every time, but to store it in the local Map
    const { email, password, exp } = jwt.verify(token, "secret") as JwtPayload;

    const user = await uow.userRepository.findByEmailAndPassword(
      email,
      password,
    );

    if (!user || !roles.length || !exp) return false;

    const tokenExp = moment(exp * 1000); // because the jsonwebtoken sets the exp in seconds
    const now = moment();

    if (tokenExp.diff(now) < FIVE_MINUTES) {
      const userProperties = user.getProperties();
      const token = jwt.sign(userProperties, "secret", { expiresIn: "7h" });
      action.response.set("new-token", token);
    }

    if (roles.includes(user.role.value)) {
      Logger.get().setBindings({ role: user.role.value });
      return true;
    }
    return false;
  },
  currentUserChecker: async (action: Action) => {
    // here you can use request/response objects from action
    // you need to provide a user object that will be injected in controller actions
    const token = action.request.headers["authorization"];
    const uow = Container.get(UnitOfWorkService);
    // TODO - add identity manager support in order not to request
    // the user from the database every time, but to store it in the local Map
    const { email, password } = jwt.verify(token, "secret") as JwtPayload;
    const user = await uow.userRepository.findByEmailAndPassword(
      email,
      password,
    );
    if (user) {
      Logger.get().setBindings({ id: user.id.value });
    }
    return user;
  },
  classTransformer: false,
  controllers: [ClientController, HostController, AuthController],
  middlewares: [InitAsyncLocalStorageMiddleware],
});

// run express application on port 3000
app.listen(3000, () => {
  console.log("backend started on 3000 port");
});
