import { Event } from "./Event";

export class BookingCanceledByClientEvent extends Event {
  constructor(entityId: string) {
    super(entityId);
  }
}
