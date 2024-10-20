import "reflect-metadata";
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(Container);

import { ClientController } from "./src/controllers/ClientController";
import { HostController } from "./src/controllers/HostController";
import { AuthController } from "./src/controllers/AuthController";
import { InitAsyncLocalStorageMiddleware } from "./src/middlewares/InitAsyncLocalStorageMiddleware";
import { authorizationChecker } from "./src/auth/authorizationChecker";
import { currentUserChecker } from "./src/auth/currentUserChecker";

import { ODBC } from "./ignite";

const bootstrap = async () => {
  await ODBC.init();

  const app = express(); // your created express server

  // creates express app, registers all controller routes and returns you express app instance
  useExpressServer(app, {
    authorizationChecker,
    currentUserChecker,
    classTransformer: false,
    controllers: [ClientController, HostController, AuthController],
    middlewares: [InitAsyncLocalStorageMiddleware],
  });

  // run express application on port 3000
  app.listen(3000, () => {
    console.log("backend started on 3000 port");
  });
};

bootstrap();
