import { Event } from "./Event";

export class BookingUpdatedEvent extends Event {
  constructor(entityId: string) {
    super(entityId);
  }
}
