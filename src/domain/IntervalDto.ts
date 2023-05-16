import { DateTime } from "luxon";
export default class IntervalDto {
  id: number;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  constructor(
    id: number,
    startTime: DateTime,
    endTime: DateTime,
    dayOfWeek: number
  ) {
    const format = "HH:mm:ss";

    this.id = id;
    this.startTime = startTime.toFormat(format);
    this.endTime = endTime.toFormat(format);
    this.dayOfWeek = dayOfWeek;
  }
}
