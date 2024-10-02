import { WorkDaysHasDuplicatesError } from "../errors/WorkDaysHasDuplicatesError";
import { WorkDaysMoreThenSeverDaysError } from "../errors/WorkDaysMoreThenSeverDaysError";
import { Weekday } from "../valueObjects/Weekday";

export class WorkDays {
  private _workDays: Weekday[];

  constructor(workDays: Weekday[]) {
    if (workDays.length > 7) {
      throw new WorkDaysMoreThenSeverDaysError();
    }

    const hasDuplicate = workDays.some((val, i) => workDays.indexOf(val) !== i);

    if (hasDuplicate) {
      throw new WorkDaysHasDuplicatesError();
    }

    this._workDays = workDays;
  }

  public getWorkDays() {
    return this._workDays;
  }
}
