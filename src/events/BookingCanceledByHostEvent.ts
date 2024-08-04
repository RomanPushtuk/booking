import { Event } from "./Event";

export class BookingCanceledByHostEvent extends Event {
  constructor(entityId: string) {
    super(entityId);
  }
}
