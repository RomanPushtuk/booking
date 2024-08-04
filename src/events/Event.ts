import { IEvent } from "../interfaces/IEvent";

export class Event implements IEvent {
  entityId: string;
  time: string;

  constructor(entityId: string) {
    this.entityId = entityId;
    this.time = new Date().toUTCString();
  }
}
