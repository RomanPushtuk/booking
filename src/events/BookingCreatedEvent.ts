import { Event } from "./Event";

export class BookingCreatedEvent extends Event {
  constructor(entityId: string) {
    super(entityId);
  }
}
