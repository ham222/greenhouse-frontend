import { DateTime } from "luxon";
import { WeekDay } from "./WeekDay";
import { WeekDays } from "./WeekDays";
export default class Interval {
  id: number;
  startTime: DateTime;
  endTime: DateTime;
  dayOfWeek: WeekDay;
  weekDayIndex: number;
  constructor(
    id: number,
    startTime: string,
    endTime: string,
    dayOfWeek: number
  ) {
    this.id = id;
    this.startTime = DateTime.fromFormat(startTime, "HH:mm:ss");
    this.endTime = DateTime.fromFormat(endTime, "HH:mm:ss");
    this.weekDayIndex = dayOfWeek;
    this.dayOfWeek = WeekDays[dayOfWeek];
  }
}
