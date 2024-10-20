import "reflect-metadata";
import { Action } from "routing-controllers";
import jwt, { JwtPayload } from "jsonwebtoken";

import { Logger } from "../application/Logger";
import { UserRepository } from "../repositories/UserRepository";

export const currentUserChecker = async (action: Action) => {
  // here you can use request/response objects from action
  // you need to provide a user object that will be injected in controller actions
  const token = action.request.headers["authorization"];
  // TODO - add identity manager support in order not to request
  // the user from the database every time, but to store it in the local Map
  const { email, password } = jwt.verify(token, "secret") as JwtPayload;
  const userRepository = new UserRepository();

  const user = await userRepository.findByEmailAndPassword(email, password);
  if (user) {
    Logger.get().setBindings({ id: user.id.value });
  }
  return user;
};
