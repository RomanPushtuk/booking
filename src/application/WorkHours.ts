import { WorkHoursOverlappingError } from "../errors/WorkHoursOverlappingError";
import { WorkPeriod } from "./WorkPeriod";

export class WorkHours {
  private _workHours: Array<WorkPeriod>;

  constructor(workHours: Array<WorkPeriod>) {
    if (this._hasOverlappingPeriods(workHours)) {
      throw new WorkHoursOverlappingError();
    }

    this._workHours = workHours;
  }

  public getWorkHours() {
    return this._workHours;
  }

  private _hasOverlappingPeriods(periods: Array<WorkPeriod>) {
    const convertedPeriods = periods.map((period) => ({
      from: period.from.toMinutes(),
      to: period.to.toMinutes(),
    }));

    convertedPeriods.sort((a, b) => a.from - b.from);
    for (let i = 0; i < convertedPeriods.length - 1; i++) {
      if (convertedPeriods[i].to > convertedPeriods[i + 1].from) {
        return true;
      }
    }

    return false;
  }
}
