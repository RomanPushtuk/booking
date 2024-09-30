import { Weekday } from "../valueObjects/Weekday";

export class WorkDays {
  private _workDays: Weekday[];

  constructor(workDays: Weekday[]) {
    // TODO - add check when inconsistent work days array
    // cannot be more then 7 days
    // cannot be several the same days
    this._workDays = workDays;
  }

  public getWorkDays() {
    return this._workDays;
  }
}
