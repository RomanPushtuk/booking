import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import { asyncLocalStorage } from "../../asyncLocalStorage";
import { Logger } from "../application/Logger";

@Service()
@Middleware({ type: "before" })
export class InitAsyncLocalStorageMiddleware
  implements ExpressMiddlewareInterface
{
  use(request: any, response: any, next: (err?: any) => any): void {
    const store = new Map<string, unknown>();

    const ip =
      request.headers["x-forwarded-for"] || request.socket.remoteAddress;

    asyncLocalStorage.run(store, () => {
      Logger.init(ip);
      next();
    });
  }
}
