import "reflect-metadata";
import { Action } from "routing-controllers";
import jwt, { JwtPayload } from "jsonwebtoken";

import { Logger } from "../application/Logger";
import { moment } from "../utils/moment";
import { FIVE_MINUTES } from "../constants/FIVE_MINUTES";
import { UserRepository } from "../repositories/UserRepository";

export const authorizationChecker = async (action: Action, roles: string[]) => {
  // here you can use request/response objects from action
  // also if decorator defines roles it needs to access the action
  // you can use them to provide granular access check
  // checker must return either boolean (true or false)
  // either promise that resolves a boolean value
  const token = action.request.headers["authorization"];
  // TODO - add identity manager support in order not to request
  // the user from the database every time, but to store it in the local Map
  const { email, password, exp } = jwt.verify(token, "secret") as JwtPayload;

  const userRepository = new UserRepository();

  const user = await userRepository.findByEmailAndPassword(email, password);

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
};
