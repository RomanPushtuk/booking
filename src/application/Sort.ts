export class Sort {
  order: "ack" | "desc" = "desc";
  key: string = "id";

  constructor(order: "ack" | "desc", key: string) {
    this.order = order;
    this.key = key;
  }
}
