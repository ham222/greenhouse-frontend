import { IntervalDto } from "src/domain/IntervalDto";
import Interval from "src/domain/Interval";
export const convertIntervalArrayToIntervalDtoArray = (
  intervals: Interval[]
): IntervalDto[] => {
  let format = "hh:mm:ss";
  let schedule: IntervalDto[] = [];
  intervals.forEach((interval) => {
    let intervalDto = {
      startTime: interval.startTime.toFormat(format),
      endTime: interval.endTime.toFormat(format),
      dayOfWeek: interval.weekDayIndex,
    };
    schedule.push(intervalDto);
  });
  return schedule;
};
