import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "before" })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): void {

    const ip =
      request.headers["x-forwarded-for"] || request.socket.remoteAddress;

    console.log("do something...");
    next();
  }
}
