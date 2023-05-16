import { DateTime } from "luxon";

export class CreateIntervalDto {
  startTime: string;
  endTime: string;
  dayOfWeek: number;

  constructor(startTime: DateTime, endTime: DateTime, dayOfWeek: number) {
    const format = "HH:mm:ss";
    this.startTime = startTime.toFormat(format);
    this.endTime = endTime.toFormat(format);
    this.dayOfWeek = dayOfWeek;
  }
}
