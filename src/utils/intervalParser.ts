import { IntervalDto } from "src/domain/IntervalDto";
import Interval from "src/domain/Interval";
import { GroupedIntervals } from "src/domain/GroupedIntervals";
import { ungroupIntervals } from "./groupIntervals";
export const convertGroupedIntervalsToIntervalDtoArray = (
  intervals: GroupedIntervals
): IntervalDto[] => {
  let format = "hh:mm:ss";
  let ungroupedIntervals: Interval[] = ungroupIntervals(intervals);
  let schedule: IntervalDto[] = [];
  ungroupedIntervals.forEach((interval) => {
    let intervalDto = {
      startTime: interval.startTime.toFormat(format),
      endTime: interval.endTime.toFormat(format),
      dayOfWeek: interval.weekDayIndex,
    };
    schedule.push(intervalDto);
  });
  return schedule;
};
