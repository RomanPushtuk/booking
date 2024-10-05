import pino from "pino";
import { asyncLocalStorage } from "../../asyncLocalStorage";

const logger = pino();

export class Logger {
  static init(traceId: string) {
    const store = asyncLocalStorage.getStore() as Map<string, unknown>;
    const childLogger = logger.child({
      traceId,
    });
    store.set("logger", childLogger);
  }

  static get() {
    const store = asyncLocalStorage.getStore() as Map<string, unknown>;
    const childLogger = store?.get("logger") as pino.Logger<never, boolean>;
    return childLogger ?? logger;
  }
}
