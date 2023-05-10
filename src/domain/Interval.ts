import { DateTime } from "luxon";
import { WeekDay } from "./WeekDay";
import { WeekDays } from "./WeekDays";
export default class Interval {
  startTime: DateTime;
  endTime: DateTime;
  dayOfWeek: WeekDay;
  weekDayIndex: number;
  constructor(startTime: string, endTime: string, dayOfWeek: number) {
    this.startTime = DateTime.fromFormat(startTime, "hh:mm:ss");
    this.endTime = DateTime.fromFormat(endTime, "hh:mm:ss");
    this.weekDayIndex = dayOfWeek;
    this.dayOfWeek = WeekDays[dayOfWeek];
  }
}
