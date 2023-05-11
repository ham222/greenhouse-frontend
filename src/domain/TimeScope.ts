import { Duration } from "luxon";

export default class TimeScope {
  name: string;
  scope: Duration;
  constructor(name: string, scope: Duration) {
    this.name = name;
    this.scope = scope;
  }
}
