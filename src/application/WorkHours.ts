import { WorkPeriod } from "./WorkPeriod";

export class WorkHours {
  private _workHours: Array<WorkPeriod>;

  constructor(workHours: Array<WorkPeriod>) {
    // TODO - add check when inconsistent work periods
    // f.e. [{ from: 10:00, to: 13:00 }, { from: 14:00, to: 19:00 }] - CORRECT
    // [{ from: 10:00, to: 13:00 }, { from: 11:00, to: 14:00 }] - INCORRECT
    this._workHours = workHours;
  }

  public getWorkHours() {
    return this._workHours;
  }
}
