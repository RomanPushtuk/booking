import { Inject } from "typedi";
import { Event } from "../events/Event";

export class AggregateRoot {
  // @Inject()
  // eventStoreDB: EventStoreDB;

  dispatch(event: Event): void {
    // this.eventStoreDB.save(event);
  }
}
