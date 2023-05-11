import { Duration } from "luxon";

export default class TimeScope {
  name: string;
  scope: Duration;
  averageTo?: Duration;
  constructor(
    name: string,
    scope: Duration,
    averageTo: Duration | undefined = undefined
  ) {
    this.name = name;
    this.scope = scope;
    this.averageTo = averageTo;
  }
}
