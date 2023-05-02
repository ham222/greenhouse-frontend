import { GroupedIntervals } from "src/domain/GroupedIntervals";
import { Interval } from "src/domain/Interval";

export const groupIntervals = (intervals: Interval[]): GroupedIntervals => {
  const groupedSchedule: GroupedIntervals = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  for (const interval of intervals) {
    groupedSchedule[interval.dayOfWeek].push(interval);
  }

  return groupedSchedule;
};
