export default class Interval {
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  constructor(startTime: string, endTime: string, dayOfWeek: number) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.dayOfWeek = dayOfWeek;
  }
}
