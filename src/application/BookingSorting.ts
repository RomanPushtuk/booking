import { SortDirection } from "../valueObjects/SortDirection";

export class BookingSorting {
  public readonly direction: SortDirection;
  public readonly property: string;
  constructor(direction: string, property: string) {
    this.direction = new SortDirection(direction);
    this.property = property;
  }
}
