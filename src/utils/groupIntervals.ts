import { GroupedIntervals } from "src/domain/GroupedIntervals";
import Interval from "src/domain/Interval";
import { WeekDays } from "src/domain/WeekDays";

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

  Object.entries(groupedSchedule).forEach(
    ([key, intvals]) =>
      (groupedSchedule[key as keyof GroupedIntervals] = intvals.sort(
        (a, b) => a.startTime.toMillis() - b.startTime.toMillis()
      ))
  );

  return groupedSchedule;
};

export const appendToGroupIntervals = (
  intervals: Interval[],
  groupedSchedule: GroupedIntervals
): GroupedIntervals => {
  for (const interval of intervals) {
    groupedSchedule[interval.dayOfWeek].push(interval);
  }

  return groupedSchedule;
};

export const ungroupIntervals = (
  groupedIntervals: GroupedIntervals
): Interval[] => {
  let intervals: Interval[] = [];

  for (let item of WeekDays) {
    intervals.push(...groupedIntervals[item]);
  }

  return intervals;
};
